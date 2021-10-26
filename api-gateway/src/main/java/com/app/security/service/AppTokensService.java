package com.app.security.service;





import com.app.security.dto.AuthenticationDto;
import com.app.security.dto.TokensDto;
import com.app.security.exception.AppSecurityException;
import com.app.security.proxy.UsersServiceProxy;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppTokensService {

    @Value("3000000")
    private Long accessTokenExpirationDateMs;

    @Value("30000000")
    private Long refreshTokenExpirationDateMs;

    @Value("access-token-expiration-date-ms")
    private String refreshTokenProperty;

    @Value("Bearer ")
    protected String tokenBearer;

    private final SecretKey secretKey;

    private final UsersServiceProxy usersServiceProxy;

   public Mono<TokensDto> generateTokens(AuthenticationDto authenticationDto) {

        if (authenticationDto == null) {
            return Mono.error(() -> new AppSecurityException("Authentication data is null"));
        }
        return usersServiceProxy
                .findByLogin(authenticationDto.getLogin())
                .flatMap(user -> {
                    var currentDateMs = System.currentTimeMillis();
                    var currentDate = new Date(currentDateMs);

                    var accessTokensDateMs = currentDateMs + accessTokenExpirationDateMs;
                    var accessTokenDate = new Date(accessTokensDateMs);

                    var refreshTokenDateMs = currentDateMs + refreshTokenExpirationDateMs;
                    var refreshTokenDate = new Date(refreshTokenDateMs);

                    var accessToken = Jwts
                            .builder()
                            .setSubject(user.getId())
                            .setExpiration(accessTokenDate)
                            .setIssuedAt(currentDate)
                            .signWith(secretKey)
                            .claim("login", user.getLogin())
                            .claim("name", user.getName())
                            .claim("surname", user.getSurname())
                            .claim("email", user.getEmail())
                            .claim("role", user.getRole())
                            .compact();

                    var refreshToken = Jwts
                            .builder()
                            .setSubject(user.getId())
                            .setExpiration(refreshTokenDate)
                            .setIssuedAt(currentDate)
                            .signWith(secretKey)
                            .compact();

                    return Mono.just(TokensDto
                            .builder()
                            .accessToken(accessToken)
                            .refreshToken(refreshToken)
                            .build());
                });
    }

    public Mono<Authentication> parse(String header) {
        if (header == null) {
            return Mono.error(() -> new AppSecurityException("Access token is null"));
        }

        if (!header.startsWith(tokenBearer)) {
            return Mono.error(() -> new AppSecurityException("Access token has incorrect format"));
        }

        var accessToken = header.replace(tokenBearer, "");

        if (hasTokenExpired(accessToken)) {
            return Mono.error(() -> new AppSecurityException("Your access token has expired"));
        }

        var userId = id(accessToken);
        if (userId == null) {
            return Mono.error(() -> new AppSecurityException("User id is null"));
        }
        return usersServiceProxy
                .findById(userId)
                .map(user -> {
                    return new UsernamePasswordAuthenticationToken(
                            user.getLogin(),
                            null,
                            List.of(new SimpleGrantedAuthority(user.getRole().toString())));
                });
    }

    private boolean hasTokenExpired(String token) {
        return new Date().after(expiration(token));
    }

    private Claims claims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(secretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Date expiration(String token) {
        return claims(token).getExpiration();
    }

    private String id(String token) {
        return claims(token).getSubject();
    }

    public Long getUserIdFromToken(String token) {
        return Long.valueOf(claims(token).getSubject());
    }

}

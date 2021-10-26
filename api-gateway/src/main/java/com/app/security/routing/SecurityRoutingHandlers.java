package com.app.security.routing;

import com.app.security.dto.AuthenticationDto;
import com.app.security.exception.AppSecurityException;
import com.app.security.proxy.UsersServiceProxy;
import com.app.security.service.AppTokensService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.app.security.routing.RoutingHandlersUtil.toServerResponse;

@Component
@RequiredArgsConstructor
public class SecurityRoutingHandlers {
    private final UsersServiceProxy usersServiceProxy;
    private final PasswordEncoder passwordEncoder;
    private final AppTokensService appTokensService;

    public Mono<ServerResponse> login(ServerRequest serverRequest) {
        Mono<AuthenticationDto> authenticationDtoMono = serverRequest.bodyToMono(AuthenticationDto.class);
        return authenticationDtoMono
                .flatMap(authenticationDto -> usersServiceProxy
                        .findByLogin(authenticationDto.getLogin())
                        .flatMap(user -> {
                            if (!passwordEncoder.matches(authenticationDto.getPassword(), user.getPassword())) {
                                System.out.println(authenticationDto.getPassword());
                                System.out.println(user.getPassword());
                                return Mono.error(new AppSecurityException("Password is not correct"));
                            }
                            return toServerResponse(appTokensService.generateTokens(authenticationDto), HttpStatus.OK);
                        })
                );
    }
}

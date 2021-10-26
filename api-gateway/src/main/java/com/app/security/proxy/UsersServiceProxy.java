package com.app.security.proxy;

import com.app.security.dto.GetUserDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class UsersServiceProxy {
    private final WebClient webClient;

    public UsersServiceProxy(WebClient.Builder usersWebClientBuilder) {
        this.webClient = usersWebClientBuilder.build();
    }

    public Mono<GetUserDto> findByLogin(String login) {
        return webClient
                .get()
                .uri("/login/{login}", login)
                .retrieve()
                .bodyToMono(GetUserDto.class);
    }

    public Mono<GetUserDto> findById(String id) {
        return webClient
                .get()
                .uri("/id/{id}", id)
                .retrieve()
                .bodyToMono(GetUserDto.class);
    }
}

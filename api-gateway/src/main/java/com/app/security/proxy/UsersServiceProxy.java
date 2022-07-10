package com.app.security.proxy;

import com.app.security.dto.CreateUserDto;
import com.app.security.dto.CreateUserResponseDto;
import com.app.security.dto.GetUserDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

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

    public Mono<GetUserDto> addLesson(String userId, String lessonId) {
        return webClient
                .put()
                .uri("/update/userId/{userId}/lessonId/{lessonId}", userId, lessonId)
                .retrieve()
                .bodyToMono(GetUserDto.class);
    }

    public Mono<CreateUserResponseDto> updateUser(String userId, Mono<CreateUserDto> createUserDto) {
        return createUserDto.flatMap(user -> update(userId, user));
    }


    private Mono<CreateUserResponseDto> update(String userId, CreateUserDto createUserDto){
        return webClient
                .put()
                .uri("/update/userId/{userId}", userId)
                .body(fromValue(createUserDto))
                .retrieve()
                .bodyToMono(CreateUserResponseDto.class);
    }
}

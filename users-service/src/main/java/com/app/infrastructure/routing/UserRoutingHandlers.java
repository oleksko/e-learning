package com.app.infrastructure.routing;

import com.app.application.service.UserService;
import com.app.domain.user.dto.CreateUserDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;


@Slf4j
@RequiredArgsConstructor
@Component
public class UserRoutingHandlers {

    private final UserService userService;

    public Mono<ServerResponse> registerUser(ServerRequest serverRequest) {
        System.out.println("REGISTER USER");
        Mono<CreateUserDto> registerUserRequest = serverRequest.bodyToMono(CreateUserDto.class);
        return RoutingHandlersUtil.toServerResponse(userService.registerUser(registerUserRequest), HttpStatus.CREATED);
    }

    public Mono<ServerResponse> getAllUsers(ServerRequest serverRequest){
        return RoutingHandlersUtil.toServerResponse(userService.findAll().collectList(), HttpStatus.OK);
    }

    public Mono<ServerResponse> getUserById(ServerRequest serverRequest){
        String id = serverRequest.pathVariable("id");
        return RoutingHandlersUtil.toServerResponse(userService.findById(id), HttpStatus.OK);
    }

    public Mono<ServerResponse> getUserByLogin(ServerRequest serverRequest) {
        String login = serverRequest.pathVariable("login");
        var user = userService.findByLogin(login);
        return RoutingHandlersUtil.toServerResponse(user, HttpStatus.OK);
    }

    public Mono<ServerResponse> addLesson(ServerRequest serverRequest){
        String lessonId = serverRequest.pathVariable("lessonId");
        String userId = serverRequest.pathVariable("userId");
        return RoutingHandlersUtil.toServerResponse(userService.updateLesson(userId, lessonId), HttpStatus.OK);
    }

    public Mono<ServerResponse> updateUser(ServerRequest serverRequest){
        String userId = serverRequest.pathVariable("userId");
        Mono<CreateUserDto> updateUserRequest = serverRequest.bodyToMono(CreateUserDto.class);
        return RoutingHandlersUtil.toServerResponse(userService.updateUser(userId, updateUserRequest), HttpStatus.OK);
    }

}

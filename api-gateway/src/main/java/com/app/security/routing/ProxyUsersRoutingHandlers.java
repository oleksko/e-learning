package com.app.security.routing;

import com.app.security.proxy.LessonsServiceProxy;
import com.app.security.proxy.UsersServiceProxy;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.app.security.routing.RoutingHandlersUtil.toServerResponse;

@Component
@RequiredArgsConstructor
public class ProxyUsersRoutingHandlers {
    private final UsersServiceProxy usersServiceProxy;


    public Mono<ServerResponse> findById(ServerRequest serverRequest) {
        String id = serverRequest.pathVariable("id");
        return usersServiceProxy
                .findById(id)
                .flatMap(user -> toServerResponse(Mono.just(user), HttpStatus.OK));
    }

    public Mono<ServerResponse> findByLogin(ServerRequest serverRequest) {
        String login = serverRequest.pathVariable("login");
        return usersServiceProxy
                .findByLogin(login)
                .flatMap(user -> toServerResponse(Mono.just(user), HttpStatus.OK));
    }


}

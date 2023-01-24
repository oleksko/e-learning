package com.app.security.routing;


import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.nest;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Component
public class UsersRouting {

    @Bean
    public RouterFunction<ServerResponse> usersRouterFunction(
            ProxyUsersRoutingHandlers proxyUsersRoutingHandlers
    ) {
        return nest(
                path("/users"),
                route(GET("").and(accept(MediaType.APPLICATION_JSON)), proxyUsersRoutingHandlers::users)
                        .andRoute(GET("/login/{login}").and(accept(MediaType.APPLICATION_JSON)), proxyUsersRoutingHandlers::findByLogin)
                        .andRoute(POST("/register").and(accept(MediaType.APPLICATION_JSON)), proxyUsersRoutingHandlers::create)
                        .andRoute(PUT("/update/userId/{userId}/lessonId/{lessonId}").and(accept(MediaType.APPLICATION_JSON)), proxyUsersRoutingHandlers::addLesson)
                        .andRoute(PUT("/update/userId/{userId}").and(accept(MediaType.APPLICATION_JSON)), proxyUsersRoutingHandlers::updateUser));
    }
}

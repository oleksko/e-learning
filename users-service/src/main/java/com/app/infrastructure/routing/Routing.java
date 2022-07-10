package com.app.infrastructure.routing;

import org.springframework.context.annotation.Bean;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerResponse;

import static org.springframework.web.reactive.function.server.RequestPredicates.*;
import static org.springframework.web.reactive.function.server.RouterFunctions.nest;
import static org.springframework.web.reactive.function.server.RouterFunctions.route;

@Component
public class Routing {

    @Bean
    public RouterFunction<ServerResponse> routerFunction(
            UserRoutingHandlers userRoutingHandlers
    ) {
        return nest(
                path("/users"),
                route(GET("").and(accept(MediaType.APPLICATION_JSON)), userRoutingHandlers::getAllUsers)
                        .andRoute(GET("/login/{login}").and(accept(MediaType.APPLICATION_JSON)), userRoutingHandlers::getUserByLogin)
                        .andRoute(GET("/id/{id}").and(accept(MediaType.APPLICATION_JSON)), userRoutingHandlers::getUserById)
                        .andRoute(POST("/register").and(accept(MediaType.APPLICATION_JSON)), userRoutingHandlers::registerUser)
                        .andRoute(PUT("/update/userId/{userId}").and(accept(MediaType.APPLICATION_JSON)), userRoutingHandlers::updateUser)
                        .andRoute(PUT("/update/userId/{userId}/lessonId/{lessonId}").and(accept(MediaType.APPLICATION_JSON)), userRoutingHandlers::addLesson)
        );
    }
}

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
public class LessonsRouting {

    @Bean
    public RouterFunction<ServerResponse> lessonsRouterFunction(
            ProxyLessonsRoutingHandlers proxyLessonsRoutingHandlers
    ) {
        return nest(
                path("/lessons"),
                route(GET("").and(accept(MediaType.APPLICATION_JSON)), proxyLessonsRoutingHandlers::getLessons)
                        .andRoute(GET("/title/{title}").and(accept(MediaType.APPLICATION_JSON)), proxyLessonsRoutingHandlers::findByTitle)
                        .andRoute(POST("/create").and(accept(MediaType.APPLICATION_JSON)), proxyLessonsRoutingHandlers::create)
                        .andRoute(GET("/id/{id}").and(accept(MediaType.APPLICATION_JSON)), proxyLessonsRoutingHandlers::findById)
                        .andRoute(PUT("/id/{id}").and(accept(MediaType.APPLICATION_JSON)), proxyLessonsRoutingHandlers::updateLesson)
                        .andRoute(GET("/ids/{ids}").and(accept(MediaType.APPLICATION_JSON)), proxyLessonsRoutingHandlers::findByIds));
    }
}

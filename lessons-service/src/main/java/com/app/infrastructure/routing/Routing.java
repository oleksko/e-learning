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
            LessonRoutingHandlers lessonRoutingHandlers
    ) {
        return nest(
                path("/lessons"),
                route(GET("").and(accept(MediaType.APPLICATION_JSON)), lessonRoutingHandlers::getAllLessons)
                        .andRoute(GET("/title/{title}").and(accept(MediaType.APPLICATION_JSON)), lessonRoutingHandlers::getLessonByTitle)
                        .andRoute(GET("/id/{id}").and(accept(MediaType.APPLICATION_JSON)), lessonRoutingHandlers::getLessonById)
                        .andRoute(PUT("/id/{id}").and(accept(MediaType.APPLICATION_JSON)), lessonRoutingHandlers::updateLesson)
                        .andRoute(GET("/ids/{ids}").and(accept(MediaType.APPLICATION_JSON)), lessonRoutingHandlers::geLessonIds)
                        .andRoute(GET("/lessonId/{lessonId}/resourceId/{resourceId}").and(accept(MediaType.APPLICATION_JSON)), lessonRoutingHandlers::addResourceToLesson)
                        .andRoute(POST("/register").and(accept(MediaType.APPLICATION_JSON)), lessonRoutingHandlers::registerLesson)
        );
    }
}

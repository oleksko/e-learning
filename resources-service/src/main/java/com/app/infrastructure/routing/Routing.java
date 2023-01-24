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
            ResourceRoutingHandlers resourceRoutingHandlers
    ) {
        return nest(
                path("/resources"),
                route(GET("").and(accept(MediaType.APPLICATION_JSON)), resourceRoutingHandlers::getAllResources)
                        .andRoute(GET("/name/{name}").and(accept(MediaType.APPLICATION_JSON)), resourceRoutingHandlers::getByName)
                        .andRoute(GET("/id/{id}").and(accept(MediaType.APPLICATION_JSON)), resourceRoutingHandlers::getResourceById)
                        .andRoute(GET("/ids/{ids}").and(accept(MediaType.APPLICATION_JSON)), resourceRoutingHandlers::getResourceByIds)
                        .andRoute(POST("/add/{lessonId}").and(accept(MediaType.MULTIPART_FORM_DATA)), resourceRoutingHandlers::uploadFileToLesson)
        );
    }
}

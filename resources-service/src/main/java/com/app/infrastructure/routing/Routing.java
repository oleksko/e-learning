package com.app.infrastructure.routing;

import com.app.application.service.s3.S3RouterHandler;
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
            ResourceRoutingHandlers resourceRoutingHandlers,
            S3RouterHandler s3RouterHandler
    ) {
        return nest(
                path("/resources"),
                route(GET("").and(accept(MediaType.APPLICATION_JSON)), resourceRoutingHandlers::getAllResources)
                        .andRoute(GET("/name/{name}").and(accept(MediaType.APPLICATION_JSON)), s3RouterHandler::viewFromS3)
                        .andRoute(GET("/id/{id}").and(accept(MediaType.APPLICATION_JSON)), resourceRoutingHandlers::getResourceById)
                        .andRoute(GET("/ids/{ids}").and(accept(MediaType.APPLICATION_JSON)), resourceRoutingHandlers::getResourceByIds)
                        .andRoute(POST("/add").and(accept(MediaType.MULTIPART_FORM_DATA)), resourceRoutingHandlers::uploadSingleImageToS3)
                        .andRoute(POST("/add/{lessonId}").and(accept(MediaType.MULTIPART_FORM_DATA)), resourceRoutingHandlers::uploadSingleImageToS3Test)
        );
    }
}

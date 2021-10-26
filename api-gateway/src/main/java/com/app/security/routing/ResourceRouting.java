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
public class ResourceRouting {

    @Bean
    public RouterFunction<ServerResponse> resourcesRouterFunction(
            ProxyResourceRoutingHandlers proxyResourceRoutingHandlers
    ) {
        return nest(
                path("/resources"),
                route(GET("/name/{name}").and(accept(MediaType.APPLICATION_JSON)), proxyResourceRoutingHandlers::findByName)
                .andRoute(GET("/id/{id}").and(accept(MediaType.APPLICATION_JSON)), proxyResourceRoutingHandlers::findById)
                .andRoute(GET("/ids/{ids}").and(accept(MediaType.APPLICATION_JSON)), proxyResourceRoutingHandlers::findByIds));
    }
}

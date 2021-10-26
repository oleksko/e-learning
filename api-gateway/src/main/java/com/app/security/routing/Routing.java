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
public class Routing {

    @Bean
    public RouterFunction<ServerResponse> loginFunction(
            SecurityRoutingHandlers securityRoutingHandlers
    ) {
        return nest(
                path("/login"),
                route(POST("").and(accept(MediaType.APPLICATION_JSON)), securityRoutingHandlers::login));
    }
}

package com.app.security.routing;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static org.springframework.web.reactive.function.BodyInserters.fromValue;

public interface RoutingHandlersUtil {
    static <T> Mono<ServerResponse> toServerResponse(Mono<T> mono, HttpStatus status) {
        return mono.flatMap(response -> ServerResponse
                .status(status)
                .contentType(MediaType.APPLICATION_JSON)
                .body(fromValue(response)))
                .onErrorResume(e -> ServerResponse
                        .status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(fromValue(e.getMessage())));
    }
}

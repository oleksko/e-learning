package com.app.security.routing;


import com.app.security.proxy.ResourcesServiceProxy;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.List;

import static com.app.security.routing.RoutingHandlersUtil.toServerResponse;

@Component
@RequiredArgsConstructor
public class ProxyResourceRoutingHandlers {
    private final ResourcesServiceProxy resourcesServiceProxy;

    public Mono<ServerResponse> findByName(ServerRequest serverRequest) {
        String name = serverRequest.pathVariable("name");
        return resourcesServiceProxy
                .findByName(name)
                .flatMap(resource -> toServerResponse(Mono.just(resource), HttpStatus.OK));
    }


    public Mono<ServerResponse> findById(ServerRequest serverRequest) {
        String id = serverRequest.pathVariable("id");
        return resourcesServiceProxy
                .findById(id)
                .flatMap(resource -> toServerResponse(Mono.just(resource), HttpStatus.OK));
    }

    public Mono<ServerResponse> findByIds(ServerRequest serverRequest) {
        String ids = serverRequest.pathVariable("ids");
        return resourcesServiceProxy
                .findByIds(ids)
                .flatMap(resource -> toServerResponse(Mono.just(resource), HttpStatus.OK));
    }
}


package com.app.infrastructure.routing;

import com.app.application.service.ResourceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@Component
public class ResourceRoutingHandlers {

    private final ResourceService resourceService;


    public Mono<ServerResponse> uploadFileToLesson(ServerRequest request) {
        String lessonId = request.pathVariable("lessonId");
        return request.multipartData()
                .flatMap(parts -> {
                    Map<String, Part> part = parts.toSingleValueMap();
                    return Mono.just((FilePart) part.get("file"));
                })
                .flatMap(file -> {
                    return RoutingHandlersUtil.toServerResponse(resourceService.addResourcesAndLesson(file, lessonId), HttpStatus.ACCEPTED);
                });
    }

    public Mono<ServerResponse> getByName(ServerRequest request) {
        String name = request.pathVariable("name");
        var resource = resourceService.findByName(name);
        return RoutingHandlersUtil.toServerResponse(resource, HttpStatus.OK);
    }


    public Mono<ServerResponse> getAllResources(ServerRequest serverRequest) {
        return RoutingHandlersUtil.toServerResponse(resourceService.findAll().collectList(), HttpStatus.OK);
    }

    public Mono<ServerResponse> getResourceById(ServerRequest serverRequest) {
        String id = serverRequest.pathVariable("id");
        return RoutingHandlersUtil.toServerResponse(resourceService.findById(id), HttpStatus.OK);
    }

    public Mono<ServerResponse> getResourceByName(ServerRequest serverRequest) {
        String name = serverRequest.pathVariable("name");
        var user = resourceService.findByName(name);
        return RoutingHandlersUtil.toServerResponse(user, HttpStatus.OK);
    }

    public Mono<ServerResponse> getResourceByIds(ServerRequest serverRequest) {
        String ids = serverRequest.pathVariable("ids");
        List<String> resourcesIds = List.of(ids.split(","));
        var resources = resourceService.findByIds(resourcesIds);
        return RoutingHandlersUtil.toServerResponse(resources.collectList(), HttpStatus.OK);
    }


}

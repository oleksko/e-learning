package com.app.security.routing;

import com.app.security.dto.CreateLessonDto;
import com.app.security.proxy.LessonsServiceProxy;
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
public class ProxyLessonsRoutingHandlers {

    private final LessonsServiceProxy lessonsServiceProxy;

    public Mono<ServerResponse> findByTitle(ServerRequest serverRequest) {
        String title = serverRequest.pathVariable("title");
        System.out.println(title);
        return lessonsServiceProxy
                .findByTitle(title)
                .flatMap(lesson -> toServerResponse(Mono.just(lesson), HttpStatus.OK));
    }

    public Mono<ServerResponse> findById(ServerRequest serverRequest) {
        String id = serverRequest.pathVariable("id");
        return lessonsServiceProxy
                .findById(id)
                .flatMap(lesson -> toServerResponse(Mono.just(lesson), HttpStatus.OK));
    }

    public Mono<ServerResponse> findByIds(ServerRequest serverRequest) {
        String ids = serverRequest.pathVariable("ids");
        return lessonsServiceProxy
                .findByIds(ids)
                .flatMap(lesson -> toServerResponse(Mono.just(lesson), HttpStatus.OK));
    }

    public Mono<ServerResponse> create(ServerRequest serverRequest) {
        Mono<CreateLessonDto>  createLessonDtoMono = serverRequest.bodyToMono(CreateLessonDto.class);
        return lessonsServiceProxy
                .createLessonTest(createLessonDtoMono)
                .flatMap(lesson -> toServerResponse(Mono.just(lesson), HttpStatus.OK));
    }

    public Mono<ServerResponse> getLessons(ServerRequest serverRequest) {
        return lessonsServiceProxy.getLessons().flatMap(lesson -> toServerResponse(Mono.just(lesson), HttpStatus.OK));
    }

    public Mono<ServerResponse> updateLesson(ServerRequest serverRequest) {
        System.out.println("updatelesson");
        Mono<CreateLessonDto> createLessonDtoMono = serverRequest.bodyToMono(CreateLessonDto.class);
        String id = serverRequest.pathVariable("id");
        return lessonsServiceProxy.updateLesson(id, createLessonDtoMono).flatMap(lesson -> toServerResponse(Mono.just(lesson), HttpStatus.OK));
    }

}

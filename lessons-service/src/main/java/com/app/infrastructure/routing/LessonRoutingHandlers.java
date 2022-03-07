package com.app.infrastructure.routing;

import com.app.application.service.LessonService;
import com.app.domain.lesson.dto.CreateLessonDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@Component
public class LessonRoutingHandlers {

    private final LessonService lessonService;

    public Mono<ServerResponse> registerLesson(ServerRequest serverRequest) {
        Mono<CreateLessonDto> registerUserRequest = serverRequest.bodyToMono(CreateLessonDto.class);
        return RoutingHandlersUtil.toServerResponse(lessonService.registerLesson(registerUserRequest), HttpStatus.CREATED);
    }


    public Mono<ServerResponse> updateLesson(ServerRequest serverRequest) {
        Mono<CreateLessonDto> registerUserRequest = serverRequest.bodyToMono(CreateLessonDto.class);
        String id = serverRequest.pathVariable("id");
        System.out.println("UPDATE");
        return RoutingHandlersUtil.toServerResponse(lessonService.updateLesson(registerUserRequest, id), HttpStatus.CREATED);
    }


    public Mono<ServerResponse> addResourceToLesson(ServerRequest serverRequest) {
        String lessonId = serverRequest.pathVariable("lessonId");
        String resourceId = serverRequest.pathVariable("resourceId");
        return RoutingHandlersUtil.toServerResponse(lessonService.addResourceToLesson(lessonId, resourceId), HttpStatus.CREATED);
    }


    public Mono<ServerResponse> getAllLessons(ServerRequest serverRequest){
        return RoutingHandlersUtil.toServerResponse(lessonService.findAll().collectList(), HttpStatus.OK);
    }

    public Mono<ServerResponse> getLessonById(ServerRequest serverRequest){
        String id = serverRequest.pathVariable("id");
        return RoutingHandlersUtil.toServerResponse(lessonService.findById(id), HttpStatus.OK);
    }

    public Mono<ServerResponse> getLessonByTitle(ServerRequest serverRequest) {
        String login = serverRequest.pathVariable("title");
        var lesson = lessonService.findByTitle(login);
        return RoutingHandlersUtil.toServerResponse(lesson, HttpStatus.OK);
    }

    public Mono<ServerResponse> geLessonIds(ServerRequest serverRequest) {
        String ids = serverRequest.pathVariable("ids");
        List<String> lessonsIds = List.of(ids.split(","));
        var lessons = lessonService.findByIds(lessonsIds);
        return RoutingHandlersUtil.toServerResponse(lessons.collectList(), HttpStatus.OK);
    }

}

package com.app.application.proxy;

import com.app.application.proxy.dto.CreateLessonResponseDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;


@Service
public class LessonServiceProxy {
    private final WebClient webClient;

    public LessonServiceProxy(WebClient.Builder lessonsWebClientBuilder) {
        this.webClient = lessonsWebClientBuilder.build();
    }

    public Mono<CreateLessonResponseDto> addResourceToLesson(String lessonId, String resourceId) {
        System.out.println("HERE ADD RESOURCER TO LESSON ERROR");
        var response = webClient
                .get()
                .uri("/lessonId/{lessonId}/resourceId/{resourceId}", lessonId, resourceId)
                .retrieve()
                .bodyToMono(CreateLessonResponseDto.class);

        System.out.println(response.block());
        response.map(r -> {
            System.out.println(r);
            return r;
        });
        return response;
    }

}

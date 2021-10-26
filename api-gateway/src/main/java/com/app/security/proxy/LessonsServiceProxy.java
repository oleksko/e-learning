package com.app.security.proxy;


import com.app.security.dto.GetLessonDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class LessonsServiceProxy {
    private final WebClient webClient;

    public LessonsServiceProxy(WebClient.Builder lessonsWebClientBuilder) {
        this.webClient = lessonsWebClientBuilder.build();
    }

    public Mono<GetLessonDto> findByTitle(String title) {
        return webClient
                .get()
                .uri("/title/{title}", title)
                .retrieve()
                .bodyToMono(GetLessonDto.class);
    }

    public Mono<GetLessonDto> findById(String id) {
        return webClient
                .get()
                .uri("/id/{id}", id)
                .retrieve()
                .bodyToMono(GetLessonDto.class);
    }


    public Mono<GetLessonDto[]> findByIds(String ids) {
        return webClient
                .get()
                .uri("/ids/{ids}", ids)
                .retrieve()
                .bodyToMono(GetLessonDto[].class);
    }

}

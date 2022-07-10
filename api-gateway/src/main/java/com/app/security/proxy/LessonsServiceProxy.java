package com.app.security.proxy;


import com.app.security.dto.CreateLessonDto;
import com.app.security.dto.CreateLessonResponseDto;
import com.app.security.dto.GetLessonDto;
import com.app.security.exception.AppSecurityException;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

import static com.app.security.routing.RoutingHandlersUtil.toServerResponse;
import static org.springframework.web.reactive.function.BodyInserters.fromValue;

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


    public Mono<CreateLessonResponseDto> createLessonTest(Mono<CreateLessonDto> createLessonDtoMono) {
        return createLessonDtoMono.flatMap(lesson -> create(lesson)
        );
    }

    //    TODO ADD ERRO HANDLING/MAPPING
    public Mono<CreateLessonResponseDto> create(CreateLessonDto createLessonDto) {
        System.out.println("==================");
        System.out.println(createLessonDto.toString());
        System.out.println("==================");
        return webClient
                .post()
                .uri("/register")
                .body(fromValue(createLessonDto))
//                .body(createLessonDto)
                .exchangeToMono(response -> {
                    if (response.statusCode().equals(HttpStatus.CREATED)) {
                        System.out.println("OK");
                        return response.bodyToMono(CreateLessonResponseDto.class);
                    } else {
                        System.out.println("NOT OK");
                        System.out.println(response.toString());
                        return response.createException().flatMap(Mono::error);
                    }
                });
//                .onErrorResume(e -> Mono.just("Error " + e.getMessage())
//                        .flatMap(s -> ServerResponse.ok()
//                                .contentType(MediaType.TEXT_PLAIN)
////                                .bodyValue(s)))
//                .onStatus(HttpStatus::isError, response ->  {
////                    return toServerResponse(Mono.just(response), HttpStatus.OK);
////                        ServerResponse.ok().contentType(MediaType.APPLICATION_JSON).body(response)
//                    return Mono.error(new AppSecurityException("error message"));
//                })
//                .bodyToMono(CreateLessonResponseDto.class);
    }


//    public Mono<CreateLessonResponseDto> createLesson(Mono<CreateLessonDto> createLessonDtoMono) {
//        System.out.println("TEST 3");
//        System.out.println(Mono.just(createLessonDtoMono));
//        return createLessonDtoMono.map(lesson -> {
//            if (lesson.getTitle().isEmpty()) {
//                return Mono.just(CreateLessonResponseDto.builder().build());
//            } else {
//                return webClient
//                        .post()
//                        .uri("/register")
////                .body(fromValue(createLessonDtoMono))
//                        .bodyValue(lesson)
//                        .retrieve()
//                        .bodyToMono(CreateLessonResponseDto.class);
//            }
//        });
////        return webClient
////                .post()
////                .uri("/register")
//////                .body(fromValue(createLessonDtoMono))
////                .body(Mono.just(createLessonDtoMono), CreateLessonDto.class)
////                .retrieve()
////                .bodyToMono(CreateLessonResponseDto.class);
////    }
//    }
//


    public Mono<GetLessonDto[]> findByIds(String ids) {
        return webClient
                .get()
                .uri("/ids/{ids}", ids)
                .retrieve()
                .bodyToMono(GetLessonDto[].class);
    }

    public Mono<GetLessonDto[]> getLessons() {
        return webClient
                .get()
                .uri("/")
                .retrieve()
                .bodyToMono(GetLessonDto[].class);
    }

    public Mono<CreateLessonResponseDto> updateLesson(String id, Mono<CreateLessonDto> createLessonDtoMono) {
        return createLessonDtoMono.flatMap(lesson -> update(id, lesson));
    }

    private Mono<CreateLessonResponseDto> update(String id, CreateLessonDto lesson) {

        return webClient
                .put()
                .uri("/id/{id}", id)
                .body(fromValue(lesson))
//                .body(createLessonDto)
                .exchangeToMono(response -> {
                    if (response.statusCode().equals(HttpStatus.CREATED)) {
                        System.out.println("OK");
                        return response.bodyToMono(CreateLessonResponseDto.class);
                    } else {
                        System.out.println("NOT OK");
                        System.out.println(response.toString());
                        return response.createException().flatMap(Mono::error);
                    }
                });
    }
}

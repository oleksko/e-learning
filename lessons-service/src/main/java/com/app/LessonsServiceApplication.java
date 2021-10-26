package com.app;

import com.app.application.service.LessonService;
import com.app.domain.lesson.Lesson;
import com.app.domain.lesson.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import reactor.core.publisher.Flux;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class LessonsServiceApplication implements ApplicationRunner {
    private final LessonRepository lessonRepository;

    public static void main(String[] args) {
        SpringApplication.run(LessonsServiceApplication.class, args);
    }

    //TODO https://thepracticaldeveloper.com/full-reactive-stack-2-backend-webflux/#loading-data-into-mongodb-with-an-applicationrunner


    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("before save to database");

        var lesson1 = Lesson
                .builder()
                .id("1less")
                .description("Description lesson 1")
                .resourcesIds(List.of("1res", "2res"))
                .title("title1")
                .build();

        var lesson2 = Lesson
                .builder()
                .id("2less")
                .description("Description lesson 2")
                .resourcesIds(List.of("1res"))
                .title("title2")
                .build();

        var lesson3 = Lesson
                .builder()
                .id("3less")
                .description("Description lesson 3")
                .resourcesIds(List.of("2res", "3res"))
                .title("title3")
                .build();


        lessonRepository.deleteAll()
                .thenMany(
                        Flux.just(lesson1, lesson2, lesson3))
                .flatMap(this.lessonRepository::save)
                .thenMany(this.lessonRepository.findAll())
                .subscribe(l -> log.info(l.toString()));

        log.info("saved to database");
    }
}

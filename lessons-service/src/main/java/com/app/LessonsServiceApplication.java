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
                .description("Celem przedmiotu jest przekazanie elementarnej wiedzy na temat podstawowych algorytmow i struktur danych z wykorzystaniem jezyka C++")
                .resourcesIds(List.of("1res", "2res"))
                .title("Algorytmy i Struktury Danych")
                .build();

        var lesson2 = Lesson
                .builder()
                .id("2less")
                .description("Celem przedmiotu jest przekazanie elementarnej wiedzy na temat podstaw programowania obiektowego w jezyku JAVA")
                .resourcesIds(List.of("1res"))
                .title("Programowanie Obiektowe")
                .build();

        var lesson3 = Lesson
                .builder()
                .id("3less")
                .description("Celem przedmiotu jest przekazanie elementarnej wiedzy na temat budowy, działania oraz użytkowania sieci komputerowych. Przedmiot omawia istotę działania sieci lokalnych LAN oraz techniki stosowane w sieciach rozległych WAN")
                .resourcesIds(List.of("2res", "3res"))
                .title("Sieci Komputerowe")
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

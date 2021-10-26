package com.app.domain.lesson.repository;

import com.app.domain.config.repository.CrudRepository;
import com.app.domain.lesson.Lesson;
import reactor.core.publisher.Mono;


public interface LessonRepository extends CrudRepository<Lesson, String> {
    Mono<Lesson> findByTitle(String title);
    Mono<Void> deleteAll();
}

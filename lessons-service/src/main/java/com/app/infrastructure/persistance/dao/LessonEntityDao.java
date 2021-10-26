package com.app.infrastructure.persistance.dao;

import com.app.domain.lesson.Lesson;
import com.app.infrastructure.persistance.entity.LessonEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface LessonEntityDao extends ReactiveMongoRepository<LessonEntity, String> {
    Mono<LessonEntity> findByTitle(String title);
    Mono<Void> deleteAll();
}
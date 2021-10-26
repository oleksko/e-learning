package com.app.infrastructure.persistance.impl;

import com.app.domain.lesson.Lesson;
import com.app.domain.lesson.repository.LessonRepository;
import com.app.infrastructure.persistance.dao.LessonEntityDao;
import com.app.infrastructure.persistance.entity.LessonEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class LessonRepositoryImpl implements LessonRepository {

    private final LessonEntityDao lessonEntityDao;

    @Override
    public Mono<Lesson> save(Lesson lesson) {
        return lessonEntityDao.save(lesson.toEntity()).map(LessonEntity::toLesson);
    }

    @Override
    public Mono<Lesson> findById(String id) {
        return lessonEntityDao.findById(id).map(LessonEntity::toLesson);
    }

    @Override
    public Flux<Lesson> findAll() {
        return lessonEntityDao.findAll().map(LessonEntity::toLesson);
    }

    @Override
    public Flux<Lesson> findAllById(List<String> ids) {
        return lessonEntityDao.findAllById(ids).map(LessonEntity::toLesson);
    }

    @Override
    public Mono<Lesson> findByTitle(String title) {
        return lessonEntityDao.findByTitle(title).map(LessonEntity::toLesson);
    }

    @Override
    public Mono<Void> deleteAll() {
        return lessonEntityDao.deleteAll();
    }
}

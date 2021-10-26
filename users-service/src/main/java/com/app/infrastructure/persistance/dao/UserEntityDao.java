package com.app.infrastructure.persistance.dao;

import com.app.infrastructure.persistance.entity.UserEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;


public interface UserEntityDao extends ReactiveMongoRepository<UserEntity, String> {
    Mono<UserEntity> findByLogin(String login);
    Mono<Void> deleteAll();
}
package com.app.infrastructure.persistance.dao;

import com.app.infrastructure.persistance.entity.ResourceEntity;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;


public interface ResourceEntityDao extends ReactiveMongoRepository<ResourceEntity, String> {
    Mono<ResourceEntity> findByName(String Name);
}
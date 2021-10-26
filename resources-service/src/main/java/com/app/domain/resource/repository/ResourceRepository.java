package com.app.domain.resource.repository;


import com.app.domain.config.repository.CrudRepository;
import com.app.domain.resource.Resource;
import reactor.core.publisher.Mono;

public interface ResourceRepository extends CrudRepository<Resource, String> {
    Mono<Resource> findByName(String login);
    Mono<Void> deleteAll();
}

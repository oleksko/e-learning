package com.app.domain.config.repository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

public interface CrudRepository<T, ID> {
    Mono<T> save(T t);
    Mono<T> findById(ID id);
    Flux<T> findAll();
    Flux<T> findAllById(List<ID> ids);
    Mono<Void> deleteAll();
}

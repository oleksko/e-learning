package com.app.infrastructure.persistance.impl;


import com.app.domain.resource.Resource;
import com.app.domain.resource.repository.ResourceRepository;
import com.app.infrastructure.persistance.dao.ResourceEntityDao;
import com.app.infrastructure.persistance.entity.ResourceEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class ResourceRepositoryImpl implements ResourceRepository {

    private final ResourceEntityDao resourceEntityDao;

    @Override
    public Mono<Resource> save(Resource resource) {
        return resourceEntityDao
                .save(resource.toEntity())
                .map(ResourceEntity::toResource);
    }

    @Override
    public Mono<Resource> findById(String id) {
        return resourceEntityDao.findById(id)
                .map(ResourceEntity::toResource);
    }

    @Override
    public Flux<Resource> findAll() {
        return resourceEntityDao.findAll()
                .map(ResourceEntity::toResource);
    }

    @Override
    public Flux<Resource> findAllById(List<String> ids) {
        return resourceEntityDao.findAllById(ids)
                .map(ResourceEntity::toResource);
    }

    @Override
    public Mono<Resource> findByName(String name) {
        return resourceEntityDao.findByName(name)
                .map(ResourceEntity::toResource);
    }

    @Override
    public Mono<Void> deleteAll() {
        return resourceEntityDao.deleteAll();
    }
}

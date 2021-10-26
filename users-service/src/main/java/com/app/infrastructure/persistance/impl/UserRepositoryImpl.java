package com.app.infrastructure.persistance.impl;

import com.app.domain.user.User;
import com.app.domain.user.repository.UserRepository;
import com.app.infrastructure.persistance.dao.UserEntityDao;
import com.app.infrastructure.persistance.entity.UserEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RequiredArgsConstructor
@Repository
public class UserRepositoryImpl implements UserRepository {

    private final UserEntityDao userEntityDao;

    @Override
    public Mono<User> save(User user) {
        return userEntityDao
                .save(user.toEntity())
                .map(UserEntity::toUser); 
    }

    @Override
    public Mono<User> findById(String id) {
        return userEntityDao.findById(id)
                .map(UserEntity::toUser);
    }

    @Override
    public Flux<User> findAll() {
        return userEntityDao.findAll()
                .map(UserEntity::toUser);
    }

    @Override
    public Flux<User> findAllById(List<String> ids) {
        return userEntityDao.findAllById(ids)
                .map(UserEntity::toUser);
    }

    @Override
    public Mono<Void> deleteAll() {
        return userEntityDao.deleteAll();
    }

    @Override
    public Mono<User> findByLogin(String login) {
        return userEntityDao.findByLogin(login)
                .map(UserEntity::toUser);
    }
}

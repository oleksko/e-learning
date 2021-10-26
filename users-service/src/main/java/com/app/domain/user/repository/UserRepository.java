package com.app.domain.user.repository;


import com.app.domain.user.User;
import com.app.domain.config.repository.CrudRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends CrudRepository<User, String> {
    Mono<User> findByLogin(String login);
}

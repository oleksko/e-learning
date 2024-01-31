package com.app;

import com.app.domain.user.User;
import com.app.domain.user.repository.UserRepository;
import com.app.domain.user.type.Role;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import reactor.core.publisher.Flux;

import java.util.Arrays;


@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class UsersServiceApplication implements ApplicationRunner {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(UsersServiceApplication.class, args);
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("before save to database");

        var user = User
                .builder()
                .id("0asd")
                .name("Adam")
                .surname("Kowalski")
                .login("admin")
                .role(Role.ROLE_ADMIN)
                .password(passwordEncoder.encode("123"))
                .lessonsIds(Arrays.asList("1less", "2less"))
                .email("adam.kowalski@test.pl")
                .build();

        var user1 = User
                .builder()
                .id("1asd")
                .name("Jacek")
                .surname("Nowak")
                .login("student")
                .role(Role.ROLE_STUDENT)
                .password(passwordEncoder.encode("123"))
                .lessonsIds(Arrays.asList("1less", "2less"))
                .email("jacek.nowak@test.pl")
                .build();

        var user2 = User
                .builder()
                .id("534asd")
                .name("Andrzej")
                .surname("Wielki")
                .login("teacher")
                .role(Role.ROLE_TEACHER)
                .password(passwordEncoder.encode("123"))
                .lessonsIds(Arrays.asList("1less", "2less", "3less"))
                .email("Andrzej.Wielki@test.pl")
                .build();



        userRepository.deleteAll()
                .thenMany(
                        Flux.just(user, user1, user2))
                                .flatMap(this.userRepository::save)
                                .thenMany(this.userRepository.findAll())
                                .subscribe(u -> log.info(u.toString()));
        System.out.println(userRepository.save(user));

        log.info("saved to database");
    }
}


//TODO nowy uzytkownik ma pusta liste lekcji i zwraca "Cannot invoke "java.util.List.add(Object)" because "lessonsIds" is null"
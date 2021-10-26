package com.app.application.service;

import com.app.application.expection.UsersServiceException;
import com.app.domain.user.User;
import com.app.domain.config.validator.Validator;
import com.app.domain.user.dto.CreateUserDto;
import com.app.domain.user.dto.CreateUserResponseDto;
import com.app.domain.user.dto.GetUserDto;
import com.app.domain.user.dto.validator.CreateUserDtoValidator;
import com.app.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public Mono<CreateUserResponseDto> registerUser(Mono<CreateUserDto> createUserDto) {

        if (createUserDto == null) {
            return Mono.error(() -> new UsersServiceException("Cannot register user. Object is null"));
        }

        return createUserDto.flatMap(
                userDto -> {
                    Validator.validate(new CreateUserDtoValidator(), userDto);

                    return userRepository
                            .findByLogin(userDto.getLogin())
                            .hasElement()
                            .flatMap(isPresent -> {
                                if (isPresent) {
                                    return Mono.error(() -> new UsersServiceException("Login already exists"));
                                }
                                return create(userDto);
                            });
                }
        );
    }

    public Flux<GetUserDto> findAll() {
        return userRepository
                .findAll()
                .map(User::toGetUserDto);
    }

    public Mono<GetUserDto> findById(String id) {
        return userRepository
                .findById(id)
                .map(User::toGetUserDto);
    }

    public Mono<GetUserDto> findByLogin(String login) {
        return userRepository
                .findByLogin(login)
                .map(User::toGetUserDto);
    }


//    TODO UPDATE LESSON AND ADD EXCEPTIONS
    public Mono<GetUserDto> update(String userId, String lessonId){
        return userRepository.findById(userId)
                .flatMap(userDB -> {
                    var user = userDB.toUpdateUserDto();
                    var lessonsIds = user.getLessonsIds();
                    lessonsIds.add(lessonId);
                    user.setLessonsIds(lessonsIds);
                    var userToDb = user.toUser();
                    return userRepository.save(userToDb).map(User::toGetUserDto);
                });
    }

    private Mono<CreateUserResponseDto> create(CreateUserDto userDto) {
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        var user = userDto.toUser();

        return userRepository
                .save(user)
                .map(User::toCreateUserResponseDto);
    }
}

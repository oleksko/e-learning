package com.app.application.service;

import com.app.application.exception.LessonsServiceException;
import com.app.domain.config.validator.Validator;
import com.app.domain.lesson.Lesson;
import com.app.domain.lesson.dto.CreateLessonDto;
import com.app.domain.lesson.dto.CreateLessonResponseDto;
import com.app.domain.lesson.dto.GetLessonDto;
import com.app.domain.lesson.dto.validator.CreateLessonDtoValidator;
import com.app.domain.lesson.repository.LessonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {
    private final LessonRepository lessonRepository;



    public Mono<CreateLessonResponseDto> registerUser(Mono<CreateLessonDto> createLessonDto) {

        if (createLessonDto == null) {
            return Mono.error(() -> new LessonsServiceException("Cannot register user. Object is null"));
        }

        return createLessonDto.flatMap(
                lessonDto -> {
                    Validator.validate(new CreateLessonDtoValidator(), lessonDto);

                    return lessonRepository
                            .findByTitle(lessonDto.getTitle())
                            .hasElement()
                            .flatMap(isPresent -> {
                                if (isPresent) {
                                    return Mono.error(() -> new LessonsServiceException("Login already exists"));
                                }
                                return create(lessonDto);
                            });
                }
        );
    }


    public Flux<GetLessonDto> findAll() {
        return lessonRepository
                .findAll()
                .map(Lesson::toGetLessonDto);
    }

    public Mono<GetLessonDto> findById(String id) {
        return lessonRepository
                .findById(id)
                .map(Lesson::toGetLessonDto);
    }

    public Mono<GetLessonDto> findByTitle(String title) {
        return lessonRepository
                .findByTitle(title)
                .map(Lesson::toGetLessonDto);
    }

    private Mono<CreateLessonResponseDto> create(CreateLessonDto lessonDto) {
        return lessonRepository
                .save(lessonDto.toLesson())
                .map(Lesson::toCreateLessonResponseDto);
    }

    public Flux<GetLessonDto> findByIds(List<String> ids){
        return lessonRepository.findAllById(ids).map(Lesson::toGetLessonDto);
    }
}

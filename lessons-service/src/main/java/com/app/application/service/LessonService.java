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


    public Mono<CreateLessonResponseDto> registerLesson(Mono<CreateLessonDto> createLessonDto) {
        if (createLessonDto == null) {
            return Mono.error(() -> new LessonsServiceException("Cannot lesson user. Object is null"));
        }

        return createLessonDto.flatMap(
                lessonDto -> {
                    Validator.validate(new CreateLessonDtoValidator(), lessonDto);

                    return lessonRepository
                            .findByTitle(lessonDto.getTitle())
                            .hasElement()
                            .flatMap(isPresent -> {
                                if (isPresent) {
                                    return Mono.error(() -> new LessonsServiceException("Lesson already exists"));
                                }
                                return create(lessonDto);
                            });
                }
        );
    }


//    public Mono<CreateLessonResponseDto> registerLessonWithResources(Mono<CreateLessonDto> createLessonDto) {
//
//        if (createLessonDto == null) {
//            return Mono.error(() -> new LessonsServiceException("Cannot register lesson. Object is null"));
//        }
//
//        return createLessonDto.flatMap(
//                lessonDto -> {
//                    Validator.validate(new CreateLessonDtoValidator(), lessonDto);
//
//                    return lessonRepository
//                            .findByTitle(lessonDto.getTitle())
//                            .hasElement()
//                            .flatMap(isPresent -> {
//                                if (isPresent) {
//                                    return Mono.error(() -> new LessonsServiceException("Lesson already exists"));
//                                }
//                                return create(lessonDto);
//                            });
//                }
//        );
//    }


    public Mono<CreateLessonResponseDto> updateLesson(Mono<CreateLessonDto> createLessonDto, String id) {
        if (createLessonDto == null) {
            return Mono.error(() -> new LessonsServiceException("Cannot update lesson. Object is null"));
        }
        if (id == null) {
            return Mono.error(() -> new LessonsServiceException("Cannot update lesson. Id is null"));
        }
        return createLessonDto.flatMap(
                lessonDto -> {
                    Validator.validate(new CreateLessonDtoValidator(), lessonDto);

                    return lessonRepository
                            .findById(id)
                            .flatMap(lesson -> {
                                if (lesson.toGetLessonDto().getId() != null) {
                                    return update(lesson, lessonDto);

                                }
                                return create(lessonDto);
                            });
                }
        );
    }

    public Mono<CreateLessonResponseDto> addResourceToLesson(String lessonId, String resourceId) {
        if (resourceId == null) {
            return Mono.error(() -> new LessonsServiceException("Cannot find resource. id is null"));
        }
        if (lessonId == null) {
            return Mono.error(() -> new LessonsServiceException("Cannot update lesson. Id is null"));
        }

        return lessonRepository.findById(lessonId).flatMap(lesson -> updateResource(lesson, resourceId));
    }


    private Mono<CreateLessonResponseDto> updateResource(Lesson lesson, String resourceId) {
        GetLessonDto lessonDto = lesson.toGetLessonDto();
        System.out.println(lessonDto.toString());
        lessonDto.getResourcesIds().add(resourceId);
        var newLesson = CreateLessonDto.builder().id(lessonDto.getId()).description(lessonDto.getDescription()).title(lessonDto.getTitle()).resourcesIds(lessonDto.getResourcesIds()).build();
        return lessonRepository.save(newLesson.toLesson()).map(Lesson::toCreateLessonResponseDto);
    }

    private Mono<CreateLessonResponseDto> update(Lesson lesson, CreateLessonDto createLessonDto) {
        GetLessonDto lessonDto = lesson.toGetLessonDto();
        createLessonDto.setId(lessonDto.getId());
        return lessonRepository.save(createLessonDto.toLesson()).map(Lesson::toCreateLessonResponseDto);
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
        System.out.println("CREATE CREATE CREATE");
        System.out.println(lessonDto.toString());
        System.out.println("CREATE CREATE CREATE");
        return lessonRepository
                .save(lessonDto.toLesson())
                .map(Lesson::toCreateLessonResponseDto);
    }

    public Flux<GetLessonDto> findByIds(List<String> ids) {
        return lessonRepository.findAllById(ids).map(Lesson::toGetLessonDto);
    }
}

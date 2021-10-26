package com.app.domain.lesson.dto.validator;

import com.app.domain.config.validator.Validator;
import com.app.domain.lesson.dto.CreateLessonDto;

import java.util.Map;

public class CreateLessonDtoValidator implements Validator<CreateLessonDto> {

    @Override
    public Map<String, String> validate(CreateLessonDto createLessonDto) {
        return null;
    }
}

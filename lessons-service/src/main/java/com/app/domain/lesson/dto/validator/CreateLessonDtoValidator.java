package com.app.domain.lesson.dto.validator;

import com.app.domain.config.validator.Validator;
import com.app.domain.lesson.dto.CreateLessonDto;

import java.util.HashMap;
import java.util.Map;

public class CreateLessonDtoValidator implements Validator<CreateLessonDto> {

    @Override
    public Map<String, String> validate(CreateLessonDto createLessonDto) {
        var errors = new HashMap<String, String>();

        if (createLessonDto == null) {
            errors.put("create lesson dto", "is null");
            return errors;
        }

        return errors;
    }
}

package com.app.domain.resource.dto.validator;

import com.app.domain.config.validator.Validator;
import com.app.domain.resource.dto.CreateResourceDto;

import java.util.HashMap;
import java.util.Map;

public class CreateResourceDtoValidator implements Validator<CreateResourceDto> {

    @Override
    public Map<String, String> validate(CreateResourceDto createUserDto) {
        var errors = new HashMap<String, String>();

        if (createUserDto == null) {
            errors.put("create user dto", "is null");
            return errors;
        }


        return errors;
    }
}

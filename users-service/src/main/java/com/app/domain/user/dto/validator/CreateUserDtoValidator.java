package com.app.domain.user.dto.validator;

import com.app.domain.config.validator.Validator;
import com.app.domain.user.dto.CreateUserDto;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class CreateUserDtoValidator implements Validator<CreateUserDto> {

    @Override
    public Map<String, String> validate(CreateUserDto createUserDto) {
        var errors = new HashMap<String, String>();

        if (createUserDto == null) {
            errors.put("create user dto", "is null");
            return errors;
        }

        var username = createUserDto.getLogin();
        if (hasIncorrectUsername(username)) {
            errors.put("username", "is not correct");
        }

        var password = createUserDto.getPassword();
        var passwordConfirmation = createUserDto.getPasswordConfirmation();
        if (hasIncorrectPasswords(password, passwordConfirmation)) {
            errors.put("password", "is not correct");
        }

        return errors;
    }

    private boolean hasIncorrectUsername(String username) {
        return username == null;
    }

    private boolean hasIncorrectPasswords(String password, String passwordConfirmation) {
        return !Objects.equals(password, passwordConfirmation);
    }
}

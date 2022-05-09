package com.app.domain.user.dto;

import com.app.domain.user.User;
import com.app.domain.user.type.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateUserDto {
    private String name;
    private String login;
    private String surname;
    private String email;
    private String password;
    private String passwordConfirmation;
    private List<String> lessonsIds;
    private Role role;

    public User toUser() {
        return User
                .builder()
                .name(name)
                .surname(surname)
                .login(login)
                .email(email)
                .role(role)
                .password(password)
                .lessonsIds(lessonsIds)
                .build();
    }
}

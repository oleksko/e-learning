package com.app.security.dto;

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

}

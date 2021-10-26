package com.app.domain.user.dto;

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
public class GetUserDto {
    private String id;
    private String login;
    private String name;
    private String surname;
    private String email;
    private String password;
    private String passwordConfirmation;
    private List<String> lessonsIds;
    private Role role;
}

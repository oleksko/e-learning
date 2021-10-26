package com.app.domain.user;

import com.app.domain.user.dto.CreateUserResponseDto;
import com.app.domain.user.dto.GetUserDto;
import com.app.domain.user.dto.UpdateUserDto;
import com.app.domain.user.type.Role;
import com.app.infrastructure.persistance.entity.UserEntity;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class User {
    String id;
    String login;
    String name;
    String surname;
    String email;
    String password;
    List<String> lessonsIds;
    Role role;

    public GetUserDto toGetUserDto() {
        return GetUserDto
                .builder()
                .id(id)
                .name(name)
                .surname(surname)
                .login(login)
                .email(email)
                .password(password)
                .role(role)
                .lessonsIds(lessonsIds)
                .build();
    }

    public UpdateUserDto toUpdateUserDto() {
        return UpdateUserDto
                .builder()
                .id(id)
                .name(name)
                .surname(surname)
                .login(login)
                .email(email)
                .password(password)
                .role(role)
                .lessonsIds(lessonsIds)
                .build();
    }

    public CreateUserResponseDto toCreateUserResponseDto() {
        return CreateUserResponseDto
                .builder()
                .id(id)
                .login(login)
                .build();
    }

    public UserEntity toEntity() {
        return UserEntity
                .builder()
                .id(id)
                .name(name)
                .surname(surname)
                .login(login)
                .email(email)
                .password(password)
                .role(role)
                .lessonsIds(lessonsIds)
                .build();
    }

}

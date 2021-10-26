package com.app.infrastructure.persistance.entity;

import com.app.domain.user.User;
import com.app.domain.user.type.Role;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
@Document(collection = "users")
public class UserEntity{
    @Id
    private String id;
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
                .id(id)
                .name(name)
                .surname(surname)
                .login(login)
                .email(email)
                .password(password)
                .lessonsIds(lessonsIds)
                .role(role)
                .build();
    }
}
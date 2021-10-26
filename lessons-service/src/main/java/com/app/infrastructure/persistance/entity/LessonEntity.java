package com.app.infrastructure.persistance.entity;


import com.app.domain.lesson.Lesson;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
@Document(collection = "lessons")
public class LessonEntity {

    @Id
    private String id;
    private String title;
    private String description;
    private List<String> resourcesIds;


    public Lesson toLesson(){
        return Lesson
                .builder()
                .id(id)
                .title(title)
                .description(description)
                .resourcesIds(resourcesIds)
                .build();
    }
}

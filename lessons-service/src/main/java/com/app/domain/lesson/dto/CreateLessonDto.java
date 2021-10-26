package com.app.domain.lesson.dto;

import com.app.domain.lesson.Lesson;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateLessonDto {
    String id;
    String title;
    String description;
    List<String> resourcesIds;


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

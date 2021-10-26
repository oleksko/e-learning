package com.app.domain.lesson;

import com.app.domain.lesson.dto.CreateLessonResponseDto;
import com.app.domain.lesson.dto.GetLessonDto;
import com.app.infrastructure.persistance.entity.LessonEntity;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class Lesson {
    String id;
    String title;
    String description;
    List<String> resourcesIds;



    public GetLessonDto toGetLessonDto() {
        return GetLessonDto
                .builder()
                .id(id)
                .title(title)
                .description(description)
                .resourcesIds(resourcesIds)
                .build();
    }


    public CreateLessonResponseDto toCreateLessonResponseDto() {
        return CreateLessonResponseDto
                .builder()
                .id(id)
                .title(title)
                .build();
    }

    public LessonEntity toEntity() {
        return LessonEntity
                .builder()
                .id(id)
                .title(title)
                .description(description)
                .resourcesIds(resourcesIds)
                .build();
    }

}



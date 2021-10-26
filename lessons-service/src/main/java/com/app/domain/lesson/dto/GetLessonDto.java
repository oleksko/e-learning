package com.app.domain.lesson.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetLessonDto {
    String id;
    String title;
    String description;
    List<String> resourcesIds;
}

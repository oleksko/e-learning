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
public class CreateLessonDto {
    String id;
    String title;
    String description;
    List<String> resourcesIds;
}

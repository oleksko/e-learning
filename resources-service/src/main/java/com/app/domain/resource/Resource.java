package com.app.domain.resource;

import com.app.domain.resource.dto.CreateResourceResponseDto;
import com.app.domain.resource.dto.GetResourceDto;
import com.app.infrastructure.persistance.entity.ResourceEntity;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode
@ToString
public class Resource {
    String id;
    String url;
    String name;

    public GetResourceDto toGetResourceDto() {
        return GetResourceDto
                .builder()
                .id(id)
                .name(name)
                .url(url)
                .build();
    }

    public CreateResourceResponseDto toCreateResourceResponseDto() {
        return CreateResourceResponseDto
                .builder()
                .id(id)
                .name(name)
                .build();
    }

    public ResourceEntity toEntity() {
        return ResourceEntity
                .builder()
                .id(id)
                .name(name)
                .url(url)
                .build();
    }

}

package com.app.infrastructure.persistance.entity;

import com.app.domain.resource.Resource;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
@Builder
@Document(collection = "src/main/resources")
public class ResourceEntity{
    @Id
    private String id;
    private String name;
    private String url;

    public Resource toResource() {
        return Resource
                .builder()
                .id(id)
                .name(name)
                .url(url)
                .build();
    }
}
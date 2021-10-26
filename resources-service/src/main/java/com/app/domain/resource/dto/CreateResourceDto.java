package com.app.domain.resource.dto;

import com.app.domain.resource.Resource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreateResourceDto {
    private Long id;
    private String name;
    private String url;

    public CreateResourceDto(String name) {
        this.name=name;
    }


    public Resource toResource() {
        return Resource
                .builder()
                .name(name)
                .url(url)
                .build();
    }
}

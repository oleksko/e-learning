package com.app.security.proxy;


import com.app.security.dto.GetResourceDto;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class ResourcesServiceProxy {
    private final WebClient webClient;


    public ResourcesServiceProxy(WebClient.Builder resourcesWebClientBuilder) {this.webClient=resourcesWebClientBuilder.build();}

    public Mono<GetResourceDto> findByName(String name) {
        return webClient
                .get()
                .uri("/name/{name}", name)
                .retrieve()
                .bodyToMono(GetResourceDto.class);
    }

    public Mono<GetResourceDto> findById(String id) {
        return webClient
                .get()
                .uri("/id/{id}", id)
                .retrieve()
                .bodyToMono(GetResourceDto.class);
    }

    public Mono<GetResourceDto[]> findByIds(String ids) {
        return webClient
                .get()
                .uri("/ids/{ids}", ids)
                .retrieve()
                .bodyToMono(GetResourceDto[].class);
    }
}

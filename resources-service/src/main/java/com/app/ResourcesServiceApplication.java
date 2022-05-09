package com.app;

import com.app.domain.resource.Resource;
import com.app.domain.resource.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class ResourcesServiceApplication implements ApplicationRunner {
    private final ResourceRepository resourceRepository;

    public static void main(String[] args) {
        SpringApplication.run(ResourcesServiceApplication.class, args);
    }

    @LoadBalanced
    @Bean
    WebClient.Builder lessonsWebClientBuilder() {
        return WebClient
                .builder()
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .baseUrl("http://lessons-service/lessons");
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("before save to database");

        var resource1 = Resource
                .builder()
                .id("1res")
                .name("res1")
                .url("https://filestestbucket.s3.eu-central-1.amazonaws.com/files/1ac7ecf9809545669d963635773ff36btest.jpg")
                .build();

        var resource2 = Resource
                .builder()
                .id("2res")
                .name("res2")
                .url("https://filestestbucket.s3.eu-central-1.amazonaws.com/files/1ac7ecf9809545669d963635773ff36btest.jpg")
                .build();

        var resource3 = Resource
                .builder()
                .id("3res")
                .name("res3")
                .url("https://filestestbucket.s3.eu-central-1.amazonaws.com/files/1ac7ecf9809545669d963635773ff36btest.jpg")
                .build();


        resourceRepository.deleteAll()
                .thenMany(
                        Flux.just(resource1, resource2, resource3))
                .flatMap(this.resourceRepository::save)
                .thenMany(this.resourceRepository.findAll())
                .subscribe(l -> log.info(l.toString()));

        log.info("saved to database");
    }
}

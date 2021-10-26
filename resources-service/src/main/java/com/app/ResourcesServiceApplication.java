package com.app;

import com.app.domain.resource.Resource;
import com.app.domain.resource.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import reactor.core.publisher.Flux;

@SpringBootApplication
@Slf4j
@RequiredArgsConstructor
public class ResourcesServiceApplication implements ApplicationRunner {
    private final ResourceRepository resourceRepository;

    public static void main(String[] args) {
        SpringApplication.run(ResourcesServiceApplication.class, args);
    }


    @Override
    public void run(ApplicationArguments args) throws Exception {
        log.info("before save to database");

        var resource1 = Resource
                .builder()
                .id("1res")
                .name("res1")
                .url("https://oleksiak-bucket.s3.eu-central-1.amazonaws.com/files/6797237bb0794c2e8c1310d4b0868c0atest.jpg")
                .build();

        var resource2 = Resource
                .builder()
                .id("2res")
                .name("res2")
                .url("https://oleksiak-bucket.s3.eu-central-1.amazonaws.com/files/2a319417e9564105aa9664b342bf31e4test.jpg")
                .build();

        var resource3 = Resource
                .builder()
                .id("3res")
                .name("res3")
                .url("https://oleksiak-bucket.s3.eu-central-1.amazonaws.com/files/2950082a749b4866800801976d98c6a6test.jpg")
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

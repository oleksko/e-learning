package com.app;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.WebClient;

import javax.crypto.SecretKey;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @LoadBalanced
    @Bean
    WebClient.Builder usersWebClientBuilder() {
        return WebClient
                .builder()
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .baseUrl("http://users-service/users");
    }

    @LoadBalanced
    @Bean
    WebClient.Builder lessonsWebClientBuilder() {
        return WebClient
                .builder()
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .baseUrl("http://lessons-service/lessons");
    }

    @LoadBalanced
    @Bean
    WebClient.Builder resourcesWebClientBuilder() {
        return WebClient
                .builder()
                .defaultHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE)
                .baseUrl("http://resources-service/resources");
    }

    @Bean
    public SecretKey secretKey() {
        return Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    // TODO
    /*
    * https://github.com/andreschaffer/microservices-testing-examples
    * https://github.com/hamvocke/spring-testing/tree/master/src/test/java/example
    * https://github.com/search?l=Java&q=microservices+testing&type=Repositories
    * */

}

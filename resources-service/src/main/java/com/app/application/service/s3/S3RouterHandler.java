package com.app.application.service.s3;

import com.app.domain.resource.Resource;
import com.app.domain.resource.dto.CreateResourceDto;
import com.app.domain.resource.dto.CreateResourceResponseDto;
import com.app.domain.resource.repository.ResourceRepository;
import com.app.infrastructure.routing.RoutingHandlersUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.http.codec.multipart.Part;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


import java.util.List;

import static org.springframework.web.reactive.function.server.ServerResponse.ok;

@Component
@Slf4j
@RequiredArgsConstructor
public class S3RouterHandler {

    @Autowired
    private S3Util s3Util;
    private final ResourceRepository resourceRepository;
    private final ResourceService resourceService;



    public Mono<ServerResponse> upload2S3(ServerRequest request) {
        System.out.println("HERE upload2s3");
//        TODO MIGRATE TO SERVICE
        return request
                .multipartData()
                .flatMap(pMultiValueMap -> {
                    // get input
                    List<Part> file = pMultiValueMap.get("files");
                    // dp upload
                    System.out.println(file.toString());
                    Flux<CreateResourceResponseDto> uploadResult = Flux
                            .fromIterable(file)
                            .cast(FilePart.class)
                            .flatMap(pFilePart -> {
                                String fileName = pFilePart.filename();
                                System.out.println(fileName);
                                return pFilePart
                                        .content()
                                        .flatMap(pDataBuffer -> {
                                            String path = "";
                                            try {
                                                byte[] data = new byte[pDataBuffer.readableByteCount()];
                                                pDataBuffer.read(data);
                                                path = s3Util.putObject(fileName, data);
                                                log.info("Upload file:{} to S3 result", fileName);
                                            } catch (Exception e) {
                                                log.error("Upload to S3 failed", e);
                                            }
                                            return Mono.just(new CreateResourceDto(1L, fileName, path));
                                        });
                            })
                            .flatMap(pTestCollection -> {
                                // save to mongo before upload, just for test mongo
                               // Mono<TestCollection>  mongoResult = pTestCollection
                                var res = pTestCollection.toResource();
                                System.out.println("----------------------------------------------");
                                System.out.println(res);
                                System.out.println("----------------------------------------------");
                                Mono<CreateResourceResponseDto> mongoResult = resourceRepository.save(res).map(Resource::toCreateResourceResponseDto);
                                log.info("Save to Mongo result:{}", pTestCollection);
                                return mongoResult;
                            });
                    return ok()
                            .contentType(MediaType.APPLICATION_STREAM_JSON)
                            .body(uploadResult, CreateResourceResponseDto.class);
                });
    }



    public Mono<ServerResponse> downloadFromS3(ServerRequest request) {
        String name = request.pathVariable("name");
        InputStreamResource inputStreamResource = new InputStreamResource(s3Util.getObjectAsInputStream(name));
        return ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(BodyInserters.fromResource(inputStreamResource));

    }



    public Mono<ServerResponse> viewFromS3(ServerRequest request) {
        String name = request.pathVariable("name");
        System.out.println("-------------------------------------------------");
        var resource = resourceService.findByName(name);
        System.out.println(resource);
        System.out.println("-------------------------------------------------");
        //get the image from s3 in byte[]
//        byte[] i = s3Util.getObjectAsByteArray(name);
//        ByteArrayResource byteArrayResource = new ByteArrayResource(i);
//        //use data Buffer to wrap the image in byte array
//        DefaultDataBuffer buffer = new DefaultDataBufferFactory().wrap(i);
        return RoutingHandlersUtil.toServerResponse(resource, HttpStatus.OK);
    }

}
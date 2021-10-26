package com.app.application.service.s3;

import com.app.domain.resource.Resource;
import com.app.domain.resource.dto.CreateResourceResponseDto;
import com.app.domain.resource.dto.GetResourceDto;
import com.app.domain.resource.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.codec.multipart.FilePart;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResourceService {
    private final ResourceRepository resourceRepository;
    private final S3Util s3Util;


    public Mono<CreateResourceResponseDto> addResources(FilePart part) {
        return  DataBufferUtils.join(part.content())
                .flatMap(pDataBuffer -> {
                    String path = "";
                    String filename = part.filename();
                    byte[] data = new byte[pDataBuffer.readableByteCount()];
                    pDataBuffer.read(data);
                    path = s3Util.putObject(filename, data);
                    return create(part, path);
                });
    }

    public Flux<GetResourceDto> findAll() {
        return resourceRepository
                .findAll()
                .map(Resource::toGetResourceDto);
    }


    public Flux<GetResourceDto> findByIds(List<String> ids) {
        return resourceRepository
                .findAllById(ids)
                .map(Resource::toGetResourceDto);
    }

    public Mono<GetResourceDto> findById(String id) {
        return resourceRepository
                .findById(id)
                .map(Resource::toGetResourceDto);
    }

    public Mono<GetResourceDto> findByName(String name) {
        return resourceRepository
                .findByName(name)
                .map(Resource::toGetResourceDto);
    }

    private Mono<CreateResourceResponseDto> create(FilePart part, String path) {
        var resource = Resource
                .builder()
                .name(part.filename())
                .url(path)
                .build();
        return resourceRepository
                .save(resource)
                .map(Resource::toCreateResourceResponseDto);
    }
}

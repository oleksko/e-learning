package com.app.application.service.s3;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.util.UUID;

@Service
@Getter
@Slf4j
@RequiredArgsConstructor
public class S3Util {

    private S3Client s3Client;
    private final S3Properties s3Properties;


    @PostConstruct
    public void initialize() {
        AwsBasicCredentials awsCreds = AwsBasicCredentials.create(s3Properties.getAccessKey(),
                s3Properties.getSecretKey());
        s3Client = S3Client
                .builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsCreds))
                .region(Region.EU_CENTRAL_1)
                .build();

    }


    public String putObject(String fileName, byte[] fileData) {
        String path = "files/" + UUID.randomUUID().toString().replaceAll("\\W", "") + fileName;
        PutObjectRequest putObjectRequest = PutObjectRequest
                .builder()
                .bucket(s3Properties.getBucket())
                .key(path)
                .build();
        s3Client.putObject(putObjectRequest, RequestBody.fromBytes(fileData));
        return path;
    }

}

package com.app.application.expection;

public class UsersServiceException extends RuntimeException {
    public UsersServiceException(String message) {
        super(message);
    }
}

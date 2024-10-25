package com.patchnotes.userservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class GameClientException extends RuntimeException {
    public GameClientException(String message, Throwable cause) {
        super(message, cause);
    }
}

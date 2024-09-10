package com.patchnotes.gateway.exception;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UnauthorizedException extends RuntimeException {
    private String message;

    public UnauthorizedException(String message) {
        this.message = message;
    }
}
package com.patchnotes.userservice.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private String user;
    private String token;
    private long expiration;

    public LoginResponse(String user, String token, long expiration) {
        this.user = user;
        this.token = token;
        this.expiration = expiration;
    }
}

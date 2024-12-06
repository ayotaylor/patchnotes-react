package com.patchnotes.userservice.dto.response;

import com.patchnotes.shared.dto.UserDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private UserDto user;
    private String token;
    private long expiration;

    public LoginResponse(UserDto user, String token, long expiration) {
        this.user = user;
        this.token = token;
        this.expiration = expiration;
    }
}

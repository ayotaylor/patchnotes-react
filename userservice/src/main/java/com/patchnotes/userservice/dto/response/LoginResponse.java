package com.patchnotes.userservice.dto.response;

import com.patchnotes.userservice.model.JwtToken;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginResponse {
    private JwtToken jwtToken;

    public LoginResponse(JwtToken jwtToken) {
        this.jwtToken = jwtToken;
    }
}

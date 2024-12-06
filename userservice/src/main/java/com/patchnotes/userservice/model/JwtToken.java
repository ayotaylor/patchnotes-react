package com.patchnotes.userservice.model;

import com.patchnotes.shared.dto.UserDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtToken {
    private UserDto user;
    private String token;
    private long expiration;
}

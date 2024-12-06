package com.patchnotes.userservice.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JwtToken {
    private String user;
    private String token;
    private long expiration;
}

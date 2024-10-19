package com.patchnotes.userservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterDto {
    private String email;

    private String username;

    private String password;

    private String name;

    private String pfp;

    private String bio;
}

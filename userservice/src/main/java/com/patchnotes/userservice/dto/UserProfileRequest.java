package com.patchnotes.userservice.dto;

import java.util.ArrayList;

import lombok.Getter;

@Getter
public class UserProfileRequest {
    private Long id;
    private String username;
    private String email;
    private String password;
    private String name;
    private String pfp;
    private String bio;
    private ArrayList<Long> topFive;
}

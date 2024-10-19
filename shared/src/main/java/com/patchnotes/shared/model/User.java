package com.patchnotes.shared.model;

import java.time.LocalDateTime;
import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
    private Long id;

    private String username;

    private String email;

    private String password;

    private String name;

    private String pfp;

    private String bio;

    private UserType userType;

    // ids of games
    private ArrayList<Long> topFive;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

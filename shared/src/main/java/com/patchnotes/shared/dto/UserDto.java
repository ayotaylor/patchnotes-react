package com.patchnotes.shared.dto;

import java.util.ArrayList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDto {
    private Long id;

    private String username;

    private String email;

    private String name;

    private String pfp;

    private String bio;

    // ids of games
    private ArrayList<Long> topFive;
}

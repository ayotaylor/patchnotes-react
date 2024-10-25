package com.patchnotes.userservice.dto;

import com.patchnotes.shared.enums.GameStatus;

import lombok.Getter;

@Getter
public class UserGameStatusRequest {
    GameStatus status;
}

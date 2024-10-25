package com.patchnotes.shared.model;

import com.patchnotes.shared.enums.GameStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserGameStatus {
    private Long userId;
    private Long gameId;
    private GameStatus status;
    private LocalDateTime lastUpdated;
}

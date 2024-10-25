package com.patchnotes.shared.dto;

import com.patchnotes.shared.enums.GameStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserGameStatusDto {

    private GameStatus status;

    private LocalDateTime lastUpdated;

    // private Integer rating;

    // private String platform;

}

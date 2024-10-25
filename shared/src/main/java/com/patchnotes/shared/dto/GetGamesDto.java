package com.patchnotes.shared.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class GetGamesDto {
    private List<Long> gameId;
}

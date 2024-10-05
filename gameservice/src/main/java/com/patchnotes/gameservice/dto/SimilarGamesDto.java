package com.patchnotes.gameservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimilarGamesDto {

    private Long id;
    private Long igdbId;
    private String name;
    private String cover;

    public SimilarGamesDto(Long id, Long igdbId, String name) {
        this.id = id;
        this.igdbId = igdbId;
        this.name = name;
    }
}

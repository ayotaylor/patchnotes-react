package com.patchnotes.gameservice.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimilarGamesDto {

    private Long igbdId;
    private String name;
    private String cover;

    public SimilarGamesDto(Long id, String name) {

        this.igbdId = id;
        this.name = name;
    }
}

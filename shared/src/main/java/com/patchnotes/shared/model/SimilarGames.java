package com.patchnotes.shared.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimilarGames {

    private Long id;
    private Long igdbId;
    private String name;
    private String cover;

    public SimilarGames(Long igdbId, String name) {
        this.igdbId = igdbId;
        this.name = name;
    }
}

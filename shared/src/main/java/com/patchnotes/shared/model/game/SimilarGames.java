package com.patchnotes.shared.model.game;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
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

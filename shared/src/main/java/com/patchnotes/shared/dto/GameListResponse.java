package com.patchnotes.shared.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class GameListResponse {
    private List<GameDto> games = new ArrayList<>();

    public static GameListResponse of(List<GameDto> games) {
        GameListResponse response = new GameListResponse();
        if (games != null) {
            response.setGames(games);
        }
        return response;
    }
}

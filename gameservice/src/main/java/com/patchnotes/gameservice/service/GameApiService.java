package com.patchnotes.gameservice.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.el.stream.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.patchnotes.gameservice.dto.GameDto;
import com.patchnotes.gameservice.model.Game;
import com.patchnotes.gameservice.repo.GameRepository;
import com.patchnotes.gameservice.util.GameApiClient;
import com.patchnotes.gameservice.util.MapGameUtil;

@Service
public class GameApiService {

    private final GameApiClient gameApiClient;
    private final MapGameUtil mapGameUtil;
    private final GameRepository gameRepository;

    public GameApiService(GameApiClient gameApiClient, MapGameUtil mapGameUtil, GameRepository gameRepository) {
        this.gameApiClient = gameApiClient;
        this.mapGameUtil = mapGameUtil;
        this.gameRepository = gameRepository;
    }

    @Transactional
    public void fetchAllGames() {
        int offset = 0;
        int limit = 500; // Adjust based on IGDB's rate limits
        boolean hasMoreData = true;

        while (hasMoreData) {
            JsonNode response = gameApiClient.getGames(buildRequestBody(limit, offset));
            if (response.size() == 0) {
                hasMoreData = false;
            } else {
                List<Game> games = mapResponseToGames(response);
                storeGames(games);
                offset += limit;
            }
        }
    }

    public Game getGameByIgdbId(Long id) {
        JsonNode response = gameApiClient.getGames(buildRequestBodyForId(id));

        List<Game> games = mapResponseToGames(response);

        return games.get(0) != null ? games.get(0) : null;
    }

    private String buildRequestBody(int limit, int offset) {
        return String.format("fields name,alternative_names.name,summary,storyline,first_release_date," +
                "status,release_dates.date,release_dates.region,involved_companies.company.name," +
                "involved_companies.developer,involved_companies.publisher,platforms.name,genres.name," +
                "bundles.name,remakes.name,remasters.name,similar_games.name,category,franchise.name," +
                "franchises.name,collections.name,cover.url,url,version_parent.name,parent_game.name," +
                "version_title,keywords.name,language_supports.language.name,multiplayer_modes," +
                "player_perspectives.name;" +
                "limit %d; offset %d;", limit, offset);
    }

    private String buildRequestBodyForId(Long id) {
        return String.format("fields name,alternative_names.name,summary,storyline,first_release_date," +
                "status,release_dates.date,release_dates.region,involved_companies.company.name," +
                "involved_companies.developer,involved_companies.publisher,platforms.name,genres.name," +
                "bundles.name,remakes.name,remasters.name,similar_games.name,category,franchise.name," +
                "franchises.name,collections.name,cover.url,url,version_parent.name,parent_game.name," +
                "version_title,keywords.name,language_supports.language.name,multiplayer_modes," +
                "player_perspectives.name;" +
                "where id = %d;", id);
    }

    private List<Game> mapResponseToGames(JsonNode response) {
        List<Game> games = new ArrayList<>();
        for (JsonNode gameNode : response) {
            Game game = mapGameUtil.mapIgdbResponseToGame(gameNode);
            games.add(game);
        }
        return games;
    }

    //TODO: handle exceptions properly
    private void storeGames(List<Game> games) {
        List<Game> gamesToSave = new ArrayList<>();

        try {
            for (Game game : games) {
                // Game existingGame = gameRepository.findByIgdbId(game.getIgdbId());
                // if (existingGame != null) {
                //     // Update existing game
                //     game.setId(existingGame.getId());
                //     game.setCreatedAt(existingGame.getCreatedAt());
                //     game.setUpdatedAt(java.time.LocalDateTime.now());
                // }
                gamesToSave.add(game);
            }

            gameRepository.saveAll(gamesToSave);
        } catch (IllegalArgumentException e) {
            System.out.println("Failed to save to DB" + e.getMessage());
        }
        catch (Exception e) {
            System.out.println("storeGames failed with unknown exception" + e.getMessage());
        }
    }

}

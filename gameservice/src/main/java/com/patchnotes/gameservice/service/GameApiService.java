package com.patchnotes.gameservice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.apache.el.stream.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
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
                bulkUpsertGames(games);
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
    private void bulkUpsertGames(List<Game> games) {
        // Get all IgdbIds from the new games
        List<Long> igdbIds = games.stream().map(Game::getIgdbId).collect(Collectors.toList());

        // Fetch existing games in a single query
        List<Game> existingGames = gameRepository.findAllByIgdbIdIn(igdbIds);

        // Create a map of existing games for easy lookup
        Map<Long, Game> existingGameMap = existingGames.stream()
                .collect(Collectors.toMap(Game::getIgdbId, game -> game));
        List<Game> gamesToSave = new ArrayList<>();

        try {
            for (Game game : games) {
                Game existingGame = existingGameMap.get(game.getIgdbId());
                if (existingGame != null) {
                    updateGameFields(existingGame, game);
                    gamesToSave.add(existingGame);
                }
                else {
                    gamesToSave.add(game);
                }
            }

            gameRepository.saveAll(gamesToSave);
        } catch (IllegalArgumentException e) {
            System.out.println("Failed to save to DB" + e.getMessage());
        }
        catch (Exception e) {
            System.out.println("storeGames failed with unknown exception" + e.getMessage());
        }
    }

    private void updateGameFields(Game existingGame, Game newGame) {
        existingGame.setName(newGame.getName());
        existingGame.setAlternativeNames(newGame.getAlternativeNames());
        existingGame.setSummary(newGame.getSummary());
        existingGame.setStoryLine(newGame.getStoryLine());
        existingGame.setFirstReleaseDate(newGame.getFirstReleaseDate());
        existingGame.setReleaseStatus(newGame.getReleaseStatus());
        existingGame.setRegionReleaseDate(newGame.getRegionReleaseDate());
        existingGame.setDeveloper(newGame.getDeveloper());
        existingGame.setPublisher(newGame.getPublisher());
        existingGame.setPlatforms(newGame.getPlatforms());
        existingGame.setGenres(newGame.getGenres());
        existingGame.setBundles(newGame.getBundles());
        existingGame.setRemakes(newGame.getRemakes());
        existingGame.setRemasters(newGame.getRemasters());
        existingGame.setSimilarGames(newGame.getSimilarGames());
        existingGame.setCategory(newGame.getCategory());
        existingGame.setFranchise(newGame.getFranchise());
        existingGame.setFranchises(newGame.getFranchises());
        existingGame.setCollections(newGame.getCollections());
        existingGame.setCover(newGame.getCover());
        existingGame.setUrl(newGame.getUrl());
        existingGame.setVersionParent(newGame.getVersionParent());
        existingGame.setParentGame(newGame.getParentGame());
        existingGame.setVersionTitle(newGame.getVersionTitle());
        existingGame.setKeywords(newGame.getKeywords());
        existingGame.setLanguages(newGame.getLanguages());
        existingGame.setMultiplayerModes(newGame.getMultiplayerModes());
        existingGame.setPlayerPerspectives(newGame.getPlayerPerspectives());
        existingGame.setAverageRating(newGame.getAverageRating());
        existingGame.setBacklogCount(newGame.getBacklogCount());
        existingGame.setPlayingCount(newGame.getPlayingCount());
        existingGame.setCompletedCount(newGame.getCompletedCount());
        existingGame.setUpdatedAt(java.time.LocalDateTime.now());
    }

}

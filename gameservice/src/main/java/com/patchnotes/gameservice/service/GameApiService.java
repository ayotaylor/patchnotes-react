package com.patchnotes.gameservice.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.databind.JsonNode;
import com.patchnotes.gameservice.entity.AlternativeNameEntity;
import com.patchnotes.gameservice.entity.FranchiseEntity;
import com.patchnotes.gameservice.entity.GameCollectionEntity;
import com.patchnotes.gameservice.entity.GameEntity;
import com.patchnotes.gameservice.entity.GenreEntity;
import com.patchnotes.gameservice.entity.KeywordEntity;
import com.patchnotes.gameservice.entity.LanguageEntity;
import com.patchnotes.gameservice.entity.PlatformEntity;
import com.patchnotes.gameservice.repo.FranchiseRepository;
import com.patchnotes.gameservice.repo.GameCollectionRepository;
import com.patchnotes.gameservice.repo.GameRepository;
import com.patchnotes.gameservice.repo.GenreRepository;
import com.patchnotes.gameservice.repo.KeywordRepository;
import com.patchnotes.gameservice.repo.LanguageRepository;
import com.patchnotes.gameservice.repo.PlatformRepository;
import com.patchnotes.gameservice.util.GameApiClient;
import com.patchnotes.gameservice.util.MapGameUtil;

@Service
public class GameApiService {

    private final GameApiClient gameApiClient;
    private final MapGameUtil mapGameUtil;
    private final GameRepository gameRepository;
    private final FranchiseRepository franchiseRepo;
    private final GameCollectionRepository gameCollectionRepo;
    private final GenreRepository genreRepo;
    private final KeywordRepository keywordRepo;
    private final LanguageRepository languageRepo;
    private final PlatformRepository platformRepo;

    private final Map<String, PlatformEntity> platformCache = new ConcurrentHashMap<>();
    private final Map<String, GenreEntity> genreCache = new ConcurrentHashMap<>();
    private final Map<String, FranchiseEntity> franchiseCache = new ConcurrentHashMap<>();
    private final Map<String, KeywordEntity> keywordCache = new ConcurrentHashMap<>();
    private final Map<String, LanguageEntity> languageCache = new ConcurrentHashMap<>();
    private final Map<String, GameCollectionEntity> gameCollectionCache = new ConcurrentHashMap<>();

    public GameApiService(GameApiClient gameApiClient, MapGameUtil mapGameUtil, GameRepository gameRepository,
        FranchiseRepository franchiseRepo, GameCollectionRepository gameCollectionRepo,
        GenreRepository genreRepo, KeywordRepository keywordRepo, LanguageRepository languageRepo,
        PlatformRepository platformRepo) {
        this.gameApiClient = gameApiClient;
        this.mapGameUtil = mapGameUtil;
        this.gameRepository = gameRepository;
        this.franchiseRepo = franchiseRepo;
        this.gameCollectionRepo = gameCollectionRepo;
        this.genreRepo = genreRepo;
        this.keywordRepo = keywordRepo;
        this.languageRepo = languageRepo;
        this.platformRepo = platformRepo;
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
                List<GameEntity> games = mapResponseToGames(response);
                bulkUpsertGames(games);
                offset += limit;
                // Implement rate limiting here
                try {
                    Thread.sleep(1000); // Sleep for 1 second between requests
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }

    public GameEntity getGameByIgdbId(Long id) {
        JsonNode response = gameApiClient.getGames(buildRequestBodyForId(id));
        List<GameEntity> games = mapResponseToGames(response);
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

    private List<GameEntity> mapResponseToGames(JsonNode response) {
        List<GameEntity> games = new ArrayList<>();
        for (JsonNode gameNode : response) {
            GameEntity game = mapGameUtil.mapIgdbResponseToGame(gameNode);
            games.add(game);
        }
        return games;
    }

    //TODO: handle exceptions properly
    @Transactional
    private void bulkUpsertGames(List<GameEntity> games) {
        int BATCH_SIZE = 1000;
        // Get all IgdbIds from the new games
        List<Long> igdbIds = games.stream().map(GameEntity::getIgdbId).collect(Collectors.toList());
        // Fetch existing games in a single query
        List<GameEntity> existingGames = gameRepository.findAllByIgdbIdIn(igdbIds);
        // Create a map of existing games for easy lookup
        Map<Long, GameEntity> existingGameMap = existingGames.stream()
                .collect(Collectors.toMap(GameEntity::getIgdbId, game -> game));
        List<GameEntity> gamesToSave = new ArrayList<>();

        preloadEntities();

        try {
            for (GameEntity game : games) {
                GameEntity existingGame = existingGameMap.get(game.getIgdbId());
                if (existingGame != null) {
                    updateGameFields(existingGame, game);
                    // Handle relationships / // saveRelatedGameFields\
                    handleGameRelationships(existingGame, game);
                    gamesToSave.add(existingGame);
                }
                else {
                    gamesToSave.add(game);
                }

                // Batch insert/update when reach a certain size
                if (gamesToSave.size() >= BATCH_SIZE) {
                    saveEntities(gamesToSave);
                    gamesToSave.clear();
                }
            }

            if (!gamesToSave.isEmpty()) {
                saveEntities(gamesToSave);
            }

            // Save all new entities at once
            saveNewEntities();
        } catch (IllegalArgumentException e) {
            System.out.println("Failed to save to DB" + e.getMessage());
        }
        catch (Exception e) {
            System.out.println("storeGames failed with unknown exception" + e.getMessage());
        }
    }

    private void preloadEntities() {
        platformRepo.findAll().forEach(p -> platformCache.put(p.getName(), p));
        genreRepo.findAll().forEach(g -> genreCache.put(g.getName(), g));
        franchiseRepo.findAll().forEach(f -> franchiseCache.put(f.getName(), f));
        keywordRepo.findAll().forEach(k -> keywordCache.put(k.getName(), k));
        languageRepo.findAll().forEach(l -> languageCache.put(l.getName(), l));
        gameCollectionRepo.findAll().forEach(gc -> gameCollectionCache.put(gc.getName(), gc));
    }

    private void handleGameRelationships(GameEntity gameToUpdate, GameEntity game) {
        gameToUpdate.setPlatforms(getOrCreatePlatforms(game.getPlatforms().stream()
            .map(PlatformEntity::getName).collect(Collectors.toSet())));
        gameToUpdate.setGenres(getOrCreateGenres(game.getGenres().stream()
            .map(GenreEntity::getName).collect(Collectors.toSet())));
        gameToUpdate.setFranchises(getOrCreateFranchises(game.getFranchises().stream()
            .map(FranchiseEntity::getName).collect(Collectors.toSet())));
        gameToUpdate.setKeywords(getOrCreateKeywords(game.getKeywords().stream()
            .map(KeywordEntity::getName).collect(Collectors.toSet())));
        gameToUpdate.setLanguages(getOrCreateLanguages(game.getLanguages().stream()
            .map(LanguageEntity::getName).collect(Collectors.toSet())));
        gameToUpdate.setCollections(getOrCreateGameCollections(game.getCollections().stream()
            .map(GameCollectionEntity::getName).collect(Collectors.toSet())));
    }

    private Set<PlatformEntity> getOrCreatePlatforms(Set<String> names) {
        return getOrCreateEntities(names, platformCache, name -> {
            PlatformEntity entity = new PlatformEntity();
            entity.setName(name);
            return entity;
        });
    }

    private Set<GenreEntity> getOrCreateGenres(Set<String> names) {
        return getOrCreateEntities(names, genreCache, name -> {
            GenreEntity entity = new GenreEntity();
            entity.setName(name);
            return entity;
        });
    }

    private Set<FranchiseEntity> getOrCreateFranchises(Set<String> names) {
        return getOrCreateEntities(names, franchiseCache, name -> {
            FranchiseEntity entity = new FranchiseEntity();
            entity.setName(name);
            return entity;
        });
    }

    private Set<KeywordEntity> getOrCreateKeywords(Set<String> names) {
        return getOrCreateEntities(names, keywordCache, name -> {
            KeywordEntity entity = new KeywordEntity();
            entity.setName(name);
            return entity;
        });
    }

    private Set<LanguageEntity> getOrCreateLanguages(Set<String> names) {
        return getOrCreateEntities(names, languageCache, name -> {
            LanguageEntity entity = new LanguageEntity();
            entity.setName(name);
            return entity;
        });
    }

    private Set<GameCollectionEntity> getOrCreateGameCollections(Set<String> names) {
        return getOrCreateEntities(names, gameCollectionCache, name -> {
            GameCollectionEntity entity = new GameCollectionEntity();
            entity.setName(name);
            return entity;
        });
    }

    private <T> Set<T> getOrCreateEntities(Set<String> names, Map<String, T> cache,
                                           Function<String, T> entityCreator) {
        Set<T> entities = new HashSet<>();

        for (String name : names) {
            T entity = cache.computeIfAbsent(name, entityCreator);
            entities.add(entity);
        }

        return entities;
    }

    private void saveNewEntities() {
        platformRepo.saveAll(platformCache.values());
        genreRepo.saveAll(genreCache.values());
        franchiseRepo.saveAll(franchiseCache.values());
        keywordRepo.saveAll(keywordCache.values());
        languageRepo.saveAll(languageCache.values());
        gameCollectionRepo.saveAll(gameCollectionCache.values());

        // Clear caches after saving
        platformCache.clear();
        genreCache.clear();
        franchiseCache.clear();
        keywordCache.clear();
        languageCache.clear();
        gameCollectionCache.clear();
    }

    private void saveEntities(List<GameEntity> games) {
        gameRepository.saveAll(games);
    }

    private void updateGameFields(GameEntity existingGame, GameEntity newGame) {
        existingGame.setName(newGame.getName());
        existingGame.setSummary(newGame.getSummary());
        existingGame.setStoryLine(newGame.getStoryLine());
        existingGame.setFirstReleaseDate(newGame.getFirstReleaseDate());
        existingGame.setReleaseStatus(newGame.getReleaseStatus());
        existingGame.setRegionReleaseDate(newGame.getRegionReleaseDate());
        existingGame.setDeveloper(newGame.getDeveloper());
        existingGame.setPublisher(newGame.getPublisher());
        existingGame.setBundles(newGame.getBundles());
        existingGame.setRemakes(newGame.getRemakes());
        existingGame.setRemasters(newGame.getRemasters());
        existingGame.setSimilarGames(newGame.getSimilarGames());
        existingGame.setCategory(newGame.getCategory());
        existingGame.setCover(newGame.getCover());
        existingGame.setUrl(newGame.getUrl());
        existingGame.setMultiplayerModes(newGame.getMultiplayerModes());
        existingGame.setPlayerPerspectives(newGame.getPlayerPerspectives());
        existingGame.setAverageRating(newGame.getAverageRating());
        existingGame.setBacklogCount(newGame.getBacklogCount());
        existingGame.setPlayingCount(newGame.getPlayingCount());
        existingGame.setCompletedCount(newGame.getCompletedCount());
        existingGame.setUpdatedAt(java.time.LocalDateTime.now());

        updateAlternativeNames(existingGame, newGame.getAlternativeNames());
    }

    private void updateAlternativeNames(GameEntity game, Set<AlternativeNameEntity> newAlternativeNames) {
        // Remove names that are no longer present
        game.getAlternativeNames().removeIf(name ->
            newAlternativeNames.stream().noneMatch(newName -> newName.getName().equals(name.getName())));

        // Update existing names and add new ones
        for (AlternativeNameEntity newName : newAlternativeNames) {
            AlternativeNameEntity existingName = game.getAlternativeNames().stream()
                .filter(name -> name.getName().equals(newName.getName()))
                .findFirst()
                .orElse(null);

            if (existingName != null) {
                // Update existing name
                existingName.setName(newName.getName());
                // Update other fields as necessary
            } else {
                // Add new name
                newName.setGame(game);
                game.getAlternativeNames().add(newName);
            }
        }
    }
}

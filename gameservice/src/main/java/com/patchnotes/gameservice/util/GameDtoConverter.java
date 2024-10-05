package com.patchnotes.gameservice.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.patchnotes.gameservice.dto.GameDto;
import com.patchnotes.gameservice.dto.SimilarGamesDto;
import com.patchnotes.gameservice.model.Game;
import com.patchnotes.gameservice.model.RegionReleaseDate;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class GameDtoConverter {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public GameDto convertToDTO(Game game) {

        if (game == null) {
            return null;
        }

        GameDto dto = new GameDto();
        dto.setId(game.getId());
        dto.setIgdbId(game.getIgdbId());
        dto.setName(game.getName());
        dto.setSummary(game.getSummary());
        dto.setStoryLine(game.getStoryLine());
        dto.setFirstReleaseDate(game.getFirstReleaseDate());
        dto.setReleaseStatus(game.getReleaseStatus());
        dto.setDeveloper(game.getDeveloper());
        dto.setPublisher(game.getPublisher());
        dto.setCategory(game.getCategory());
        dto.setFranchise(game.getFranchise());
        dto.setCover(game.getCover());
        dto.setUrl(game.getUrl());
        dto.setVersionParent(game.getVersionParent());
        dto.setParentGame(game.getParentGame());
        dto.setVersionTitle(game.getVersionTitle());
        dto.setAverageRating(game.getAverageRating());
        dto.setBacklogCount(game.getBacklogCount());
        dto.setPlayingCount(game.getPlayingCount());
        dto.setCompletedCount(game.getCompletedCount());

        // Convert JSON strings to objects/lists
        try {
            if (game.getAlternativeNames() != null) {
                dto.setAlternativeNames(objectMapper.readValue(game.getAlternativeNames(), List.class));
            }
            if (game.getPlatforms() != null) {
                dto.setPlatforms(objectMapper.readValue(game.getPlatforms(), List.class));
            }
            if (game.getGenres() != null) {
                dto.setGenres(objectMapper.readValue(game.getGenres(), List.class));
            }
            if (game.getBundles() != null) {
                dto.setBundles(objectMapper.readValue(game.getBundles(), List.class));
            }
            if (game.getRemakes() != null) {
                dto.setRemakes(objectMapper.readValue(game.getRemakes(), List.class));
            }
            if (game.getRemasters() != null) {
                dto.setRemasters(objectMapper.readValue(game.getRemasters(), List.class));
            }
            if (game.getSimilarGames() != null) {
                List<Map<String, Object>> similarGames = objectMapper.readValue(game.getSimilarGames(), new TypeReference<List<Map<String, Object>>>() {});
                List<SimilarGamesDto> similarGameDtos = similarGames.stream()
                    .map(similarGame -> new SimilarGamesDto(
                        Long.valueOf(similarGame.get("id").toString()),
                        Long.valueOf(similarGame.get("igdbId").toString()),
                        (String) similarGame.get("name")
                    ))
                    .collect(Collectors.toList());
                dto.setSimilarGames(similarGameDtos);
            }
            if (game.getFranchises() != null) {
                dto.setFranchises(objectMapper.readValue(game.getFranchises(), List.class));
            }
            if (game.getCollections() != null) {
                dto.setCollections(objectMapper.readValue(game.getCollections(), List.class));
            }
            if (game.getKeywords() != null) {
                dto.setKeywords(objectMapper.readValue(game.getKeywords(), List.class));
            }
            if (game.getLanguages() != null) {
                dto.setLanguages(objectMapper.readValue(game.getLanguages(), List.class));
            }
            if (game.getMultiplayerModes() != null) {
                dto.setMultiplayerModes(objectMapper.readValue(game.getMultiplayerModes(), List.class));
            }
            if (game.getPlayerPerspectives() != null) {
                dto.setPlayerPerspectives(objectMapper.readValue(game.getPlayerPerspectives(), List.class));
            }
            if (game.getRegionReleaseDate() != null) {  //TODO: come back to this
                List<RegionReleaseDate> regionReleaseDates = objectMapper.readValue(game.getRegionReleaseDate(), List.class);
                // List<SimilarGamesDto> similarGameDtos = similarGames.stream()
                //     .map(similarGame -> new SimilarGamesDto(
                //         Long.valueOf(similarGame.get("id").toString()),
                //         (String) similarGame.get("name")
                //     ))
                //     .collect(Collectors.toList());
                // dto.setSimilarGames(similarGameDtos);
                dto.setRegionReleaseDates(regionReleaseDates);
            }
        } catch (Exception e) {
            // Log the error and handle it appropriately
            e.printStackTrace();
        }

        return dto;
    }
}

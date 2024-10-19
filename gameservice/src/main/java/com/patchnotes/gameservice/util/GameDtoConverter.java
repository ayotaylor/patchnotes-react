package com.patchnotes.gameservice.util;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.patchnotes.shared.dto.GameDto;
import com.patchnotes.gameservice.model.AlternativeNameEntity;
import com.patchnotes.gameservice.model.FranchiseEntity;
import com.patchnotes.gameservice.model.GameCollectionEntity;
import com.patchnotes.gameservice.model.GameEntity;
import com.patchnotes.gameservice.model.GenreEntity;
import com.patchnotes.gameservice.model.KeywordEntity;
import com.patchnotes.gameservice.model.LanguageEntity;
import com.patchnotes.gameservice.model.PlatformEntity;
import com.patchnotes.shared.model.RegionReleaseDate;
import com.patchnotes.shared.model.SimilarGames;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class GameDtoConverter {

    private static ObjectMapper objectMapper = new ObjectMapper();

    public GameDto convertToDTO(GameEntity game) {

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
        dto.setCover(game.getCover());
        dto.setUrl(game.getUrl());
        dto.setAverageRating(game.getAverageRating());
        dto.setBacklogCount(game.getBacklogCount());
        dto.setPlayingCount(game.getPlayingCount());
        dto.setCompletedCount(game.getCompletedCount());

        // Convert JSON strings to objects/lists
        try {
            if (game.getAlternativeNames() != null) {
                Set<AlternativeNameEntity> alternativeNames = (Set<AlternativeNameEntity>) game.getAlternativeNames();
                Set<String> alternativeNameStrings = alternativeNames.stream()
                    .map(AlternativeNameEntity::getName)
                    .collect(Collectors.toSet());
                dto.setAlternativeNames(alternativeNameStrings);
            }
            if (game.getPlatforms() != null) {
                Set<PlatformEntity> platformNames = (Set<PlatformEntity>) game.getPlatforms();
                Set<String> platformNameStrings = platformNames.stream()
                    .map(PlatformEntity::getName)
                    .collect(Collectors.toSet());
                dto.setAlternativeNames(platformNameStrings);
            }
            if (game.getGenres() != null) {
                Set<GenreEntity> genreNames = (Set<GenreEntity>) game.getGenres();
                Set<String> genreNameStrings = genreNames.stream()
                    .map(GenreEntity::getName)
                    .collect(Collectors.toSet());
                dto.setAlternativeNames(genreNameStrings);
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
                List<SimilarGames> similarGameDtos = similarGames.stream()
                    .map(similarGame -> new SimilarGames(
                        Long.valueOf(similarGame.get("id").toString()),
                        (String) similarGame.get("name")
                    ))
                    .collect(Collectors.toList());
                dto.setSimilarGames(similarGameDtos);
            }
            if (game.getFranchises() != null) {
                Set<FranchiseEntity> franchiseNames = (Set<FranchiseEntity>) game.getFranchises();
                Set<String> franchiseNameStrings = franchiseNames.stream()
                    .map(FranchiseEntity::getName)
                    .collect(Collectors.toSet());
                dto.setAlternativeNames(franchiseNameStrings);
            }
            if (game.getCollections() != null) {
                Set<GameCollectionEntity> collectionNames = (Set<GameCollectionEntity>) game.getCollections();
                Set<String> collectionNameStrings = collectionNames.stream()
                    .map(GameCollectionEntity::getName)
                    .collect(Collectors.toSet());
                dto.setAlternativeNames(collectionNameStrings);
            }
            if (game.getKeywords() != null) {
                Set<KeywordEntity> keywordNames = (Set<KeywordEntity>) game.getKeywords();
                Set<String> keywordNameStrings = keywordNames.stream()
                    .map(KeywordEntity::getName)
                    .collect(Collectors.toSet());
                dto.setAlternativeNames(keywordNameStrings);
            }
            if (game.getLanguages() != null) {
                Set<LanguageEntity> languageNames = (Set<LanguageEntity>) game.getLanguages();
                Set<String> languageNameStrings = languageNames.stream()
                    .map(LanguageEntity::getName)
                    .collect(Collectors.toSet());
                dto.setAlternativeNames(languageNameStrings);
            }
            if (game.getMultiplayerModes() != null) {
                dto.setMultiplayerModes(objectMapper.readValue(game.getMultiplayerModes(), List.class));
            }
            if (game.getPlayerPerspectives() != null) {
                dto.setPlayerPerspectives(objectMapper.readValue(game.getPlayerPerspectives(), List.class));
            }
            if (game.getRegionReleaseDate() != null) {  //TODO: come back to this
                List<RegionReleaseDate> regionReleaseDates = objectMapper.readValue(game.getRegionReleaseDate(), List.class);
                dto.setRegionReleaseDates(regionReleaseDates);
            }
        } catch (Exception e) {
            // Log the error and handle it appropriately
            e.printStackTrace();
        }

        return dto;
    }

    private static <T> Set<String> convertObjListToStrList(Set<T> inputList) {
        return inputList
        .stream()
        .map((obj) -> Objects.toString(obj, null))
        .collect(Collectors.toSet());
    }
}

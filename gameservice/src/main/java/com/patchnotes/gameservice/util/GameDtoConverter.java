package com.patchnotes.gameservice.util;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.patchnotes.gameservice.entity.AlternativeNameEntity;
import com.patchnotes.gameservice.entity.FranchiseEntity;
import com.patchnotes.gameservice.entity.GameCollectionEntity;
import com.patchnotes.gameservice.entity.GameEntity;
import com.patchnotes.gameservice.entity.GenreEntity;
import com.patchnotes.gameservice.entity.KeywordEntity;
import com.patchnotes.gameservice.entity.LanguageEntity;
import com.patchnotes.gameservice.entity.PlatformEntity;
import com.patchnotes.shared.dto.GameDto;
import com.patchnotes.shared.model.game.RegionReleaseDate;
import com.patchnotes.shared.model.game.SimilarGames;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class GameDtoConverter {

    private final ObjectMapper objectMapper;

    public GameDtoConverter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
            .registerModule(new JavaTimeModule());
    }

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
                Set<AlternativeNameEntity> alternativeNames = game.getAlternativeNames();
                Set<String> alternativeNameStrings = alternativeNames.stream()
                    .map(a -> a.getName())
                    .collect(Collectors.toSet());
                dto.setAlternativeNames(alternativeNameStrings);
            }
            if (game.getPlatforms() != null) {
                Set<PlatformEntity> platformNames = game.getPlatforms();
                Set<String> platformNameStrings = platformNames.stream()
                    .map(p -> p.getName())
                    .collect(Collectors.toSet());
                dto.setPlatforms(platformNameStrings);
            }
            if (game.getGenres() != null) {
                Set<GenreEntity> genreNames = game.getGenres();
                Set<String> genreNameStrings = genreNames.stream()
                    .map(g -> g.getName())
                    .collect(Collectors.toSet());
                dto.setGenres(genreNameStrings);;
            }
            if (game.getBundles() != null) {
                dto.setBundles(objectMapper.readValue(game.getBundles(), new TypeReference<List<String>>() {}));
            }
            if (game.getRemakes() != null) {
                dto.setRemakes(objectMapper.readValue(game.getRemakes(), new TypeReference<List<String>>() {}));
            }
            if (game.getRemasters() != null) {
                dto.setRemasters(objectMapper.readValue(game.getRemasters(), new TypeReference<List<String>>() {}));
            }
            if (game.getSimilarGames() != null) {
                TypeReference<List<SimilarGames>> typeRef = new TypeReference<>() {};
                List<SimilarGames> similarGames = objectMapper.readValue(game.getSimilarGames(), typeRef);
                similarGames.forEach(s -> s.setIgdbId(s.getId()));
                dto.setSimilarGames(similarGames);
                // List<Map<String, Object>> similarGames = objectMapper.readValue(game.getSimilarGames(), new TypeReference<List<Map<String, Object>>>() {});
                // List<SimilarGames> similarGameDtos = similarGames.stream()
                //     .map(similarGame -> new SimilarGames(
                //         Long.valueOf(similarGame.get("id").toString()),
                //         (String) similarGame.get("name")
                //     ))
                //     .collect(Collectors.toList());
                // dto.setSimilarGames(similarGameDtos);
            }
            if (game.getFranchises() != null) {
                Set<FranchiseEntity> franchiseNames = game.getFranchises();
                Set<String> franchiseNameStrings = franchiseNames.stream()
                    .map(f -> f.getName())
                    .collect(Collectors.toSet());
                dto.setFranchises(franchiseNameStrings);
            }
            if (game.getCollections() != null) {
                Set<GameCollectionEntity> collectionNames = game.getCollections();
                Set<String> collectionNameStrings = collectionNames.stream()
                    .map(c -> c.getName())
                    .collect(Collectors.toSet());
                dto.setCollections(collectionNameStrings);
            }
            if (game.getKeywords() != null) {
                Set<KeywordEntity> keywordNames = game.getKeywords();
                Set<String> keywordNameStrings = keywordNames.stream()
                    .map(k -> k.getName())
                    .collect(Collectors.toSet());
                dto.setKeywords(keywordNameStrings);
            }
            if (game.getLanguages() != null) {
                Set<LanguageEntity> languageNames = game.getLanguages();
                Set<String> languageNameStrings = languageNames.stream()
                    .map(l -> l.getName())
                    .collect(Collectors.toSet());
                dto.setLanguages(languageNameStrings);
            }
            if (game.getMultiplayerModes() != null) {
                dto.setMultiplayerModes(objectMapper.readValue(game.getMultiplayerModes(), new TypeReference<List<String>>() {}));
            }
            if (game.getPlayerPerspectives() != null) {
                dto.setPlayerPerspectives(objectMapper.readValue(game.getPlayerPerspectives(), new TypeReference<List<String>>() {}));
            }
            if (game.getRegionReleaseDate() != null) {  //TODO: come back to this
                TypeReference<List<RegionReleaseDate>> typeRef = new TypeReference<>() {};
                List<RegionReleaseDate> regionReleaseDates = objectMapper.readValue(game.getRegionReleaseDate(), typeRef);
                dto.setRegionReleaseDates(regionReleaseDates);
                // List<Map<String, Object>> regionReleaseDates = objectMapper.readValue(game.getRegionReleaseDate(), typeRef);
                // List<RegionReleaseDate> regionReleaseDatesDtos = regionReleaseDates.stream()
                //     .map(r -> {
                //             List<Integer> releaseDate = (List<Integer>) r.get("date");
                //             return new RegionReleaseDate(
                //                 Region.valueOf(r.get("region").toString()),
                //                 LocalDate.of(releaseDate.get(0), releaseDate.get(1), releaseDate.get(2)));
                //         }
                //     )
                //     .collect(Collectors.toList());
                // dto.setRegionReleaseDates(regionReleaseDatesDtos);
            }
        } catch (Exception e) {
            // TODO: Log the error and handle it appropriately
            e.printStackTrace();
        }

        return dto;
    }

    // private GameDto deepCopy(GameDto original) {
    //     try {
    //         // Serialize to JSON string
    //         String jsonString = objectMapper.writeValueAsString(original);
    //         // Deserialize back to new object
    //         return objectMapper.readValue(jsonString, GameDto.class);
    //     } catch (Exception e) {
    //         log.error("Error creating deep copy: {}", e.getMessage());
    //         return original;
    //     }
    // }

    // private static <T> Set<String> convertObjListToStrList(Set<T> inputList) {
    //     return inputList
    //     .stream()
    //     .map((obj) -> Objects.toString(obj, null))
    //     .collect(Collectors.toSet());
    // }
}

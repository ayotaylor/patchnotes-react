package com.patchnotes.gameservice.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.patchnotes.gameservice.entity.AlternativeNameEntity;
import com.patchnotes.gameservice.entity.FranchiseEntity;
import com.patchnotes.gameservice.entity.GameCollectionEntity;
import com.patchnotes.gameservice.entity.GameEntity;
import com.patchnotes.gameservice.entity.GenreEntity;
import com.patchnotes.gameservice.entity.KeywordEntity;
import com.patchnotes.gameservice.entity.LanguageEntity;
import com.patchnotes.gameservice.entity.PlatformEntity;
import com.patchnotes.shared.model.game.Category;
import com.patchnotes.shared.model.game.Region;
import com.patchnotes.shared.model.game.RegionReleaseDate;

@Component
public class MapGameUtil {

    private static final ObjectMapper objectMapper;

    static {
        objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    public GameEntity mapIgdbResponseToGame(JsonNode igdbGame) {
        GameEntity game = new GameEntity();

        game.setIgdbId((igdbGame.path("id").asLong()));

        game.setName(igdbGame.path("name").asText().toLowerCase());
        game.setSummary(igdbGame.path("summary").asText().toLowerCase());
        game.setStoryLine(StringUtils.truncate(igdbGame.path("storyline").asText().toLowerCase(), 65535));

        game.setFirstReleaseDate(convertUnixTimestampToLocalDate(igdbGame.path("first_release_date").asLong()));
        setReleaseDateAndRegion(game, igdbGame.path("release_dates"), igdbGame.path("first_release_date"));
        game.setReleaseStatus(getReleaseStatus(game.getFirstReleaseDate()));

        setDeveloperAndPublisher(game, igdbGame.path("involved_companies"));

        game.setMultiplayerModes(getJsonArrayAsString(igdbGame, "multiplayer_modes"));
        game.setPlayerPerspectives(getJsonArrayAsString(igdbGame, "player_perspectives"));
        game.setBundles(getJsonArrayAsString(igdbGame, "bundles"));
        game.setSimilarGames(getSimilarGames(igdbGame.path("similar_games")));
        game.setCategory(Category.fromCode(igdbGame.path("category").asInt()));
        game.setCover(igdbGame.path("cover").path("url").asText().toLowerCase());
        game.setUrl(igdbGame.path("url").asText().toLowerCase());
        game.setRemakes(getJsonArrayAsString(igdbGame, "remakes"));
        game.setRemasters(getJsonArrayAsString(igdbGame, "remasters"));

        //setVersionInfo(game, igdbGame);
        game.setFranchises(mapFranchises(igdbGame, "franchises"));
        game.setCollections(mapCollections(igdbGame, "collections"));
        game.setPlatforms(mapPlatforms(igdbGame, "platforms"));
        game.setGenres(mapGenres(igdbGame, "genres"));
        game.setKeywords(mapKeywords(igdbGame, "keywords"));
        game.setLanguages(mapLanguages(igdbGame));

        game.setCreatedAt(LocalDateTime.now());
        game.setUpdatedAt(LocalDateTime.now());

        game.setAlternativeNames(mapAlternativeNames(igdbGame, game));
        // These fields would typically be set elsewhere, not from the IGDB response
        // game.setAverageRating(0.0);
        // game.setBacklogCount(0);
        // game.setPlayingCount(0);
        // game.setCompletedCount(0);

        return game;
    }

    private static String getJsonArrayAsString(JsonNode node, String fieldName) {
        JsonNode arrayNode = node.path(fieldName);
        if (arrayNode.isArray()) {
            List<String> items = new ArrayList<>();
            for (JsonNode item : arrayNode) {
                items.add(item.path("name").asText().toLowerCase());
            }
            return objectMapper.valueToTree(items).toString();
        }
        return null;
    }

    // private static String convertJsonArrayToObject(JsonNode node, String fieldName) {
    //     JsonNode arrayNode = node.path(fieldName);
    //     if (arrayNode.isArray()) {
    //         List<String> items = new ArrayList<>();
    //         for (JsonNode item : arrayNode) {
    //             items.add(item.path("name").asText().toLowerCase());
    //         }
    //         return objectMapper.valueToTree(items).toString();
    //     }
    //     return null;
    // }

    // private static ArrayNode getJsonNestedArrayNode(JsonNode gameNode, String fieldName) {
    //     JsonNode languageSupportsNode = gameNode.path(fieldName);
    //     if (languageSupportsNode.isMissingNode() || languageSupportsNode.isNull()) {
    //         return null;
    //     }
    //     if (!languageSupportsNode.isArray()) {
    //         return null;
    //     }

    //     return (ArrayNode) languageSupportsNode;
    // }

    private static Set<FranchiseEntity> mapFranchises(JsonNode gameNode, String fieldName) {
        Set<FranchiseEntity> franchises = new HashSet<>();
        JsonNode arrayNode = gameNode.path(fieldName);
        if (arrayNode.isArray()) {
            for (JsonNode node : arrayNode) {
                FranchiseEntity franchise = new FranchiseEntity();
                franchise.setName(node.path("name").asText().toLowerCase());
                if (franchise != null) {
                    franchises.add(franchise);
                }
            }
        }
        return franchises;
    }

    private static Set<GameCollectionEntity> mapCollections(JsonNode gameNode, String fieldName) {
        Set<GameCollectionEntity> collections = new HashSet<>();
        JsonNode arrayNode = gameNode.path(fieldName);
        if (arrayNode.isArray()) {
            for (JsonNode node : arrayNode) {
                GameCollectionEntity collection = new GameCollectionEntity();
                collection.setName(node.path("name").asText().toLowerCase());
                if (collection != null) {
                    collections.add(collection);
                }
            }
        }
        return collections;
    }

    private static Set<GenreEntity> mapGenres(JsonNode gameNode, String fieldName) {
        Set<GenreEntity> genres = new HashSet<>();
        JsonNode arrayNode = gameNode.path(fieldName);
        if (arrayNode.isArray()) {
            for (JsonNode node : arrayNode) {
                GenreEntity genre = new GenreEntity();
                genre.setName(node.path("name").asText().toLowerCase());
                if (genre != null) {
                    genres.add(genre);
                }
            }
        }
        return genres;
    }

    private static Set<PlatformEntity> mapPlatforms(JsonNode gameNode, String fieldName) {
        Set<PlatformEntity> platforms = new HashSet<>();
        JsonNode arrayNode = gameNode.path(fieldName);
        if (arrayNode.isArray()) {
            for (JsonNode node : arrayNode) {
                PlatformEntity platform = new PlatformEntity();
                platform.setName(node.path("name").asText().toLowerCase());
                if (platform != null) {
                    platforms.add(platform);
                }
            }
        }
        return platforms;
    }

    private static Set<KeywordEntity> mapKeywords(JsonNode gameNode, String fieldName) {
        Set<KeywordEntity> keywords = new HashSet<>();
        JsonNode arrayNode = gameNode.path(fieldName);
        if (arrayNode.isArray()) {
            for (JsonNode node : arrayNode) {
                KeywordEntity keyword = new KeywordEntity();
                keyword.setName(node.path("name").asText().toLowerCase());
                if (keyword != null) {
                    keywords.add(keyword);
                }
            }
        }
        return keywords;
    }

    private static Set<LanguageEntity> mapLanguages(JsonNode gameNode) {

        JsonNode languageSupportsNode = gameNode.path("language_supports");
        if (languageSupportsNode.isMissingNode() || languageSupportsNode.isNull()) {
            return new HashSet<>();
        }
        if (!languageSupportsNode.isArray()) {
            return new HashSet<>();
        }
        ArrayNode languageSupports = (ArrayNode) languageSupportsNode;
        Set<LanguageEntity> languages = new HashSet<>();
        for (JsonNode language : languageSupports) {
            LanguageEntity lang = new LanguageEntity();
            lang.setName(language.path("language").path("name").asText().toLowerCase());
        }
        return languages;
    }

    private static Set<AlternativeNameEntity> mapAlternativeNames(JsonNode gameNode, GameEntity game) {
        JsonNode altNamesNode = gameNode.path("alternative_names");
        if (altNamesNode.isMissingNode() || altNamesNode.isNull()) {
            return new HashSet<>();
        }
        if (!altNamesNode.isArray()) {
            return new HashSet<>();
        }
        ArrayNode altNames = (ArrayNode) altNamesNode;
        Set<AlternativeNameEntity> names = new HashSet<>();
        for (JsonNode altName : altNames) {
            AlternativeNameEntity altNameEntity = new AlternativeNameEntity();
            altNameEntity.setName(altName.path("name").asText().toLowerCase());
            altNameEntity.setGame(game);
            names.add(altNameEntity);
        }
        return names;
    }

    private static LocalDate convertUnixTimestampToLocalDate(long timestamp) {
        return Instant.ofEpochSecond(timestamp)
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    private static String getReleaseStatus(LocalDate firstReleaseDate) {
        return firstReleaseDate.isAfter(LocalDate.now()) ? "Upcoming" : "Released";
    }

    private static void setReleaseDateAndRegion(GameEntity game, JsonNode releaseDatesNode, JsonNode firstReleaseDate) {
        if (!firstReleaseDate.isMissingNode() && !firstReleaseDate.isNull()) {
            game.setFirstReleaseDate(convertUnixTimestampToLocalDate(firstReleaseDate.asLong()));
        }

        if (!releaseDatesNode.isMissingNode() && !releaseDatesNode.isNull() && releaseDatesNode.isArray()) {
            LocalDate firstRelease = game.getFirstReleaseDate() != null ? game.getFirstReleaseDate() : LocalDate.MAX;
            ArrayNode releaseDates = (ArrayNode) releaseDatesNode;
            List<RegionReleaseDate> regionReleaseDates = new ArrayList<>();
            for (JsonNode releaseDate : releaseDates) {
                LocalDate date = convertUnixTimestampToLocalDate(releaseDate.path("date").asLong());
                Region region = Region.fromCode(releaseDate.path("region").asInt());
                regionReleaseDates.add(new RegionReleaseDate(region, date));
                if (date.isBefore(firstRelease)) {
                    game.setFirstReleaseDate(date);
                }
            }
            game.setRegionReleaseDate(objectMapper.valueToTree(regionReleaseDates).toString());
        }
    }

    private static void setDeveloperAndPublisher(GameEntity game, JsonNode involvedCompanies) {
        if (involvedCompanies.isArray()) {
            for (JsonNode company : involvedCompanies) {
                String companyName = company.path("company").path("name").asText().toLowerCase();
                if (company.path("developer").asBoolean()) {
                    game.setDeveloper(companyName);
                }
                if (company.path("publisher").asBoolean()) {
                    game.setPublisher(companyName);
                }
            }
        }
    }

    private static String getSimilarGames(JsonNode similarGames) {
        if (similarGames.isArray()) {
            List<Map<String, Object>> games = new ArrayList<>();
            for (JsonNode game : similarGames) {
                Map<String, Object> gameMap = new HashMap<>();
                gameMap.put("id", game.path("id").asLong());
                gameMap.put("name", game.path("name").asText().toLowerCase());
                games.add(gameMap);
            }
            return objectMapper.valueToTree(games).toString();
        }
        return null;
    }
    // private static void setVersionInfo(GameEntity game, JsonNode igdbGame) {
    //     JsonNode versionParent = igdbGame.path("version_parent");
    //     JsonNode parentGame = igdbGame.path("parent_game");
    //     if (!versionParent.isMissingNode()) {
    //         game.setVersionParent(versionParent.path("name").asText().toLowerCase());
    //     } else if (!parentGame.isMissingNode()) {
    //         game.setParentGame(parentGame.path("name").asText().toLowerCase());
    //     }
    //     game.setVersionTitle(igdbGame.path("version_title").asText().toLowerCase());
    // }

    // private static <T> Set<T> mapJsonArrayToEntities(JsonNode gameNode, String fieldName, Function<JsonNode, T> entityCreator) {
        //     Set<T> entities = new HashSet<>();
        //     JsonNode arrayNode = gameNode.path(fieldName);
        //     if (arrayNode.isArray()) {
        //         for (JsonNode node : arrayNode) {
        //             T entity = entityCreator.apply(node);  // new T, setname
        //             if (entity != null) {
        //                 entities.add(entity);
        //             }
        //         }
        //     }
        //     return entities;
        // }
}

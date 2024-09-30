package com.patchnotes.gameservice.util;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.patchnotes.gameservice.model.Category;
import com.patchnotes.gameservice.model.Game;
import com.patchnotes.gameservice.model.Region;

@Component
public class MapGameUtil {
    private static final ObjectMapper objectMapper = new ObjectMapper();

    public Game mapIgdbResponseToGame(JsonNode igdbGame) {
        Game game = new Game();

        game.setName(igdbGame.path("name").asText());
        game.setAlternativeNames(getAlternativeNames(igdbGame));
        game.setSummary(igdbGame.path("summary").asText());

        game.setStoryLine(StringUtils.truncate(igdbGame.path("storyline").asText(), 65535));

        setReleaseDateAndRegion(game, igdbGame.path("release_dates"));

        setDeveloperAndPublisher(game, igdbGame.path("involved_companies"));

        game.setPlatforms(getJsonArrayAsString(igdbGame, "platforms"));
        game.setGenres(getJsonArrayAsString(igdbGame, "genres"));
        game.setBundles(getJsonArrayAsString(igdbGame, "bundles"));
        game.setRemakes(getJsonArrayAsString(igdbGame, "remakes"));
        game.setRemasters(getJsonArrayAsString(igdbGame, "remasters"));
        game.setSimilarGames(getSimilarGames(igdbGame.path("similar_games")));

        game.setCategory(Category.fromCode(igdbGame.path("category").asInt()));

        setFranchiseInfo(game, igdbGame);

        game.setCollections(getJsonArrayAsString(igdbGame, "collections"));
        game.setCover(igdbGame.path("cover").asText());
        game.setUrl(igdbGame.path("url").asText());

        setVersionInfo(game, igdbGame);

        game.setKeywords(getJsonArrayAsString(igdbGame, "keywords"));
        game.setLanguages(getJsonArrayAsString(igdbGame, "language_supports"));
        game.setMultiplayerModes(getJsonArrayAsString(igdbGame, "multiplayer_modes"));
        game.setPlayerPerspectives(getJsonArrayAsString(igdbGame, "player_perspectives"));

        // These fields would typically be set elsewhere, not from the IGDB response
        game.setAverageRating(0.0);
        game.setBacklogCount(0);
        game.setPlayingCount(0);
        game.setCompletedCount(0);

        game.setCreatedAt(LocalDateTime.now());
        game.setUpdatedAt(LocalDateTime.now());

        game.setIgdbId((igdbGame.path("id").asLong()));

        return game;
    }

    private static String getAlternativeNames(JsonNode gameNode) {
        JsonNode altNamesNode = gameNode.path("alternative_names");
        if (altNamesNode.isMissingNode() || altNamesNode.isNull()) {
            return null;
        }
        if (!altNamesNode.isArray()) {
            return null;
        }
        ArrayNode altNames = (ArrayNode) altNamesNode;
        List<String> names = new ArrayList<>();
        for (JsonNode altName : altNames) {
            names.add(altName.path("name").asText());
        }
        return objectMapper.valueToTree(names).toString();
    }

    private static LocalDate convertUnixTimestampToLocalDate(long timestamp) {
        return Instant.ofEpochSecond(timestamp)
                .atZone(ZoneId.systemDefault())
                .toLocalDate();
    }

    private static String getReleaseStatus(long firstReleaseDate) {
        LocalDate releaseDate = convertUnixTimestampToLocalDate(firstReleaseDate);
        LocalDate now = LocalDate.now();
        return releaseDate.isAfter(now) ? "Upcoming" : "Released";
    }

    private static void setReleaseDateAndRegion(Game game, JsonNode releaseDates) {
        if (releaseDates.isArray() && releaseDates.size() > 0) {
            JsonNode firstRelease = releaseDates.get(0);
            game.setReleaseDate(convertUnixTimestampToLocalDate(firstRelease.path("date").asLong()));
            game.setRegion(Region.fromCode(firstRelease.path("region").asInt()));
        }
    }

    private static void setDeveloperAndPublisher(Game game, JsonNode involvedCompanies) {
        if (involvedCompanies.isArray()) {
            for (JsonNode company : involvedCompanies) {
                String companyName = company.path("company").path("name").asText();
                if (company.path("developer").asBoolean()) {
                    game.setDeveloper(companyName);
                }
                if (company.path("publisher").asBoolean()) {
                    game.setPublisher(companyName);
                }
            }
        }
    }

    private static String getJsonArrayAsString(JsonNode node, String fieldName) {
        JsonNode arrayNode = node.path(fieldName);
        if (arrayNode.isArray()) {
            List<String> items = new ArrayList<>();
            for (JsonNode item : arrayNode) {
                items.add(item.path("name").asText());
            }
            return objectMapper.valueToTree(items).toString();
        }
        return null;
    }

    private static String getSimilarGames(JsonNode similarGames) {
        if (similarGames.isArray()) {
            List<Map<String, Object>> games = new ArrayList<>();
            for (JsonNode game : similarGames) {
                Map<String, Object> gameMap = new HashMap<>();
                gameMap.put("id", game.path("id").asLong());
                gameMap.put("name", game.path("name").asText());
                games.add(gameMap);
            }
            return objectMapper.valueToTree(games).toString();
        }
        return null;
    }

    private static void setFranchiseInfo(Game game, JsonNode igdbGame) {
        JsonNode franchise = igdbGame.path("franchise");
        if (!franchise.isMissingNode()) {
            game.setFranchise(franchise.path("name").asText());
        }
        game.setFranchises(getJsonArrayAsString(igdbGame, "franchises"));
    }

    private static void setVersionInfo(Game game, JsonNode igdbGame) {
        JsonNode versionParent = igdbGame.path("version_parent");
        JsonNode parentGame = igdbGame.path("parent_game");
        if (!versionParent.isMissingNode()) {
            game.setVersionParent(versionParent.path("name").asText());
        } else if (!parentGame.isMissingNode()) {
            game.setParentGame(parentGame.path("name").asText());
        }
        game.setVersionTitle(igdbGame.path("version_title").asText());
    }
}

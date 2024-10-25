package com.patchnotes.userservice.client;

// import reactor.core.publisher.Flux;
// import reactor.core.publisher.Mono;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.patchnotes.shared.dto.GameDto;
import com.patchnotes.shared.dto.GameListResponse;
import com.patchnotes.userservice.exception.GameClientException;

import io.netty.handler.timeout.TimeoutException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j  // If you want logging
public class GameClient {
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public GameClient(WebClient.Builder builder, @Value("${game.service.url}") String serviceUrl,
        ObjectMapper objectMapper) {
        this.objectMapper = objectMapper
            .registerModule(new JavaTimeModule())
            .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        this.webClient = builder.baseUrl(serviceUrl)
        .codecs(configurer -> configurer
                .defaultCodecs()
                .jackson2JsonDecoder(new Jackson2JsonDecoder(this.objectMapper)))
            .filter((request, next) -> {
                log.debug("Calling game service: {}", request.url());
                return next.exchange(request);
            })
            .build();//WebClient.create(serviceUrl);
    }

    public GameDto getGame(Long gameId) {
        return webClient.get().uri("/api/games/{id}", gameId)
            .retrieve().bodyToMono(GameDto.class).block();
    }

    public List<GameDto> getGames(List<Long> gameIds) {
        try {
            GameListResponse response = webClient.post().uri("/api/games")
            .contentType(MediaType.APPLICATION_JSON)
            .accept(MediaType.APPLICATION_JSON)
            .bodyValue(gameIds).retrieve()
            .bodyToMono(GameListResponse.class)
            .doOnSuccess(games -> log.debug("Successfully fetched {} games",
                    games != null ? games.getGames().size() : 0))
                .doOnError(error -> log.error("Error fetching games: {}",
                    error.getMessage()))
            .block();

            return response.getGames();
        } catch (WebClientResponseException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                log.warn("No games found for ids: {}", gameIds);
                return null;
            }
            log.error("Error fetching games: {} - {}",
                e.getStatusCode(), e.getMessage());
            throw new GameClientException(
                String.format("Failed to fetch games: %s", e.getMessage()), e);
        } catch (WebClientException e) {
            log.error("Error fetching games", e);
            throw new GameClientException("failed to fetch games from game service", e);
        } catch (TimeoutException e) {
            log.error("Error fetching games", e);
            throw new GameClientException("timeout fetching games from game service", e);
        }
    }
}

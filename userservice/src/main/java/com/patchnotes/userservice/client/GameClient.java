package com.patchnotes.userservice.client;

import com.patchnotes.shared.dto.GameDto;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
public class GameClient {
    private final WebClient webClient;

    public GameClient(@Value("${game.service.url}") String serviceUrl) {
        this.webClient = WebClient.create(serviceUrl);
    }

    public GameDto getGame(Long gameId) {
        return webClient.get().uri("games/{id}", gameId)
            .retrieve().bodyToMono(GameDto.class).block();
    }

    public List<GameDto> getGames(List<Long> gameIds) {
        return webClient.post().uri("usergames")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(gameIds).retrieve()
            .bodyToMono(new ParameterizedTypeReference<List<GameDto>>() {}).block();
    }
}

package com.patchnotes.gameservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patchnotes.gameservice.exception.GameServiceException;
import com.patchnotes.gameservice.service.GameService;
import com.patchnotes.shared.dto.GameDto;
import com.patchnotes.shared.dto.GameListResponse;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/api/games")
@RestController
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDto> getGameById(@PathVariable Long id) {

        GameDto response = gameService.getGameById(id);

        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }

    @PostMapping("")
    public ResponseEntity<GameListResponse> getGamesById(@RequestBody List<Long> ids) {
        try {
            List<GameDto> games = gameService.getGamesById(ids);

            GameListResponse response = GameListResponse.of(games);

            return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
        } catch (GameServiceException e) {
            log.error("Error processing request for game ids {}: {}", ids, e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}

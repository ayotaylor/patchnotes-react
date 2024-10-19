package com.patchnotes.gameservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patchnotes.gameservice.service.GameService;
import com.patchnotes.shared.dto.GameDto;

@RequestMapping("/api/games")
@RestController
public class GameController {

    private final GameService gameService;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDto> getGamebyId(@PathVariable Long id) {

        GameDto response = gameService.getGameById(id);

        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }

    @PostMapping("/usergames")
    public ResponseEntity<List<GameDto>> getUserGames(@RequestBody List<Long> gameIds) {
        List<GameDto> response = gameService.getGamesById(gameIds);

        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }
}

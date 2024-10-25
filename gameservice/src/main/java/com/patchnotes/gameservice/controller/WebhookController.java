package com.patchnotes.gameservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patchnotes.gameservice.dto.GameApiUpdatePayload;
import com.patchnotes.gameservice.entity.GameEntity;
import com.patchnotes.gameservice.jobs.GameDataPuller;
import com.patchnotes.gameservice.service.GameApiService;

@RestController
@RequestMapping("/games/webhook")
public class WebhookController {

    private final GameDataPuller gameDataPuller;
    private final GameApiService gameApiService;

    public WebhookController(GameApiService gameApiService, GameDataPuller gameDataPuller) {
        this.gameApiService = gameApiService;
        this.gameDataPuller = gameDataPuller;
    }

    @PostMapping("/game-update-hook")
    public ResponseEntity<String> handleIgdbUpdate(@RequestBody GameApiUpdatePayload payload) {
        // Process the update payload and update the database
        //gameDataPuller.processUpdate(payload);
        return ResponseEntity.ok("Update processed successfully");
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameEntity> getGame(@PathVariable Long id){
        GameEntity game = gameApiService.getGameByIgdbId(id);
        return game!= null ? ResponseEntity.ok(game) : ResponseEntity.notFound().build();
    }
}

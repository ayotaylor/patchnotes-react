package com.patchnotes.gameservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patchnotes.gameservice.dto.GameApiUpdatePaylod;
import com.patchnotes.gameservice.jobs.GameDataPuller;
import com.patchnotes.gameservice.service.GameService;

@RequestMapping("/api/games")
@RestController
public class GameController {

    @RestController
    @RequestMapping("/webhook")
    public class WebhookController {
        private final GameDataPuller gameDataPuller;
        private final GameService gameService;

        public WebhookController(GameService gameService, GameDataPuller gameDataPuller) {
            this.gameService = gameService;
            this.gameDataPuller = gameDataPuller;
        }

        @PostMapping("/game-update-hook")
        public ResponseEntity<String> handleIgdbUpdate(@RequestBody GameApiUpdatePaylod payload) {
            // Process the update payload and update the database
            //gameDataPuller.processUpdate(payload);
            return ResponseEntity.ok("Update processed successfully");
        }
    }
}

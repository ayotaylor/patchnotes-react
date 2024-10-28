package com.patchnotes.userservice.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.patchnotes.shared.dto.GameStatusDetailsDto;
import com.patchnotes.shared.dto.UserDto;
import com.patchnotes.shared.dto.UserGameStatusDto;
import com.patchnotes.shared.enums.GameStatus;
import com.patchnotes.userservice.dto.UserGameStatusRequest;
import com.patchnotes.userservice.exception.GameClientException;
import com.patchnotes.userservice.model.UserEntity;
import com.patchnotes.userservice.service.UserService;

import java.util.List;

@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserProfile(@PathVariable Long id) {
        try {
            UserDto user = userService.getUserProfile(id);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserProfile(@RequestBody UserEntity user) {
        try {
            UserDto updatedUser = userService.updateUserProfile(user);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("User not found");
        }
    }

    @GetMapping("/{userId}/games/{gameId}/status")
    public ResponseEntity<UserGameStatusDto> getUserGameStatus(@PathVariable Long userId, @PathVariable Long gameId) {

        UserGameStatusDto response = userService.getUserGameStatus(userId, gameId);

        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{userId}/games/{gameId}/status")
    public ResponseEntity<UserGameStatusDto> updateGameStatus(@PathVariable Long userId, @PathVariable Long gameId, @RequestBody UserGameStatusRequest request) {
        var response = userService.setUserGameStatus(userId, gameId, request.getStatus());

        return response != null ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
    }

    //TODO: get user game status by status.
    @GetMapping("/{userId}/games")
    public ResponseEntity<List<GameStatusDetailsDto>> getGameStatusByStatus(@PathVariable Long userId, @RequestParam(required=false) GameStatus filterStatus) {
        try {
            var response = userService.getGameStatusByStatus(userId, filterStatus);

            return response != null && response.size() > 0 ? ResponseEntity.ok(response) : ResponseEntity.notFound().build();
        } catch (GameClientException e) {
            return ResponseEntity.internalServerError().build();
        }  catch (Exception e) { // return correct http codes
            return ResponseEntity.notFound().build();
        }
    }

    //TODO: get all user games statuses ( not sure if this is needed)
}
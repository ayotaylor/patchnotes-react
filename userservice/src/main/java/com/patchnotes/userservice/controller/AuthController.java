package com.patchnotes.userservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.patchnotes.userservice.dto.LoginDto;
import com.patchnotes.userservice.dto.RegisterDto;
import com.patchnotes.userservice.dto.response.LoginResponse;
import com.patchnotes.userservice.exception.ApiRequestException;
import com.patchnotes.userservice.model.User;
import com.patchnotes.userservice.service.AuthService;

@RequestMapping("/api/auth")
@RestController
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDto request) {
        try {
            User registeredUser = authService.register(request);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody LoginDto request) {
        try {
            LoginResponse response = new LoginResponse(authService.authenticate(request));
            return ResponseEntity.ok(response);
        } catch (ApiRequestException e) {
            return ResponseEntity.badRequest().body("User not found");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}

package com.patchnotes.userservice.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "user_games")
public class UserGame {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private UserEntity userId;

    private Long gameId;

    @Enumerated(EnumType.STRING)
    private UserGameStatus status;

    private LocalDateTime startDate;

    private LocalDateTime completedDate;

    private int loggedHours;

    private LocalDateTime lastPlayed;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

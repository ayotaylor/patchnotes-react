// package com.patchnotes.userservice.dto;

// import java.time.LocalDateTime;

// import com.patchnotes.shared.dto.GameDto;
// import com.patchnotes.userservice.model.UserGame;
// import com.patchnotes.userservice.model.UserGameStatus;

// import lombok.Getter;
// import lombok.Setter;

// @Getter
// @Setter
// public class UserGameDto {
//     private Long id;

//     private Long userId;

//     private Long gameId;

//     private UserGameStatus status;

//     private LocalDateTime startDate;

//     private LocalDateTime completedDate;

//     private int loggedHours;

//     private LocalDateTime lastPlayed;

//     private LocalDateTime createdAt;

//     private LocalDateTime updatedAt;

//     public UserGameDto(UserGame userGame, GameDto game) {
//         this.id = userGame.getId();
//         this.userId = userGame.getUserId().getId();
//         this.gameId = game.getId();
//         this.status = userGame.getStatus();
//         this.startDate = userGame.getStartDate();
//         this.completedDate = userGame.getCompletedDate();
//         this.loggedHours = userGame.getLoggedHours();
//         this.lastPlayed = userGame.getLastPlayed();
//         this.createdAt = userGame.getCreatedAt();
//         this.updatedAt = userGame.getUpdatedAt();
//     }
// }

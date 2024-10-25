// package com.patchnotes.userservice.service;

// import java.util.Optional;

// import org.springframework.stereotype.Service;

// import com.patchnotes.shared.dto.UserGameStatusDto;
// import com.patchnotes.shared.entity.UserGameStatusId;
// import com.patchnotes.shared.enums.GameStatus;
// import com.patchnotes.userservice.model.UserEntity;
// import com.patchnotes.userservice.model.UserGameStatusEntity;
// import com.patchnotes.userservice.repo.UserGameStatusRepository;

// @Service
// public class UserGameStatusService {
//     private final UserGameStatusRepository userGameRepo;
//     //private final GameClient gameClient;

//     public UserGameStatusService(UserGameStatusRepository userGameRepo) {
//         this.userGameRepo = userGameRepo;
//     }

//     // public UserGameDto addUserGame(UserGameDto userGameDto) {

//     // }

//     // public UserGameDto getUserGame(Long userId, Long gameId) {
//     //     UserGame userGame = userGameRepo.findByUserIdAndGameId(userId, gameId)
//     //         .orElseThrow(() -> new NotFoundException("User game not found"));

//     //     GameDto gameDto = gameClient.getGame(userGame.getGameId());

//     //     return new UserGameDto(userGame, gameDto);
//     // }

//     // public List<UserGameDto> getUserGames(Long userId) {
//     //     List<UserGame> userGames = userGameRepo.findByUserId(userId)
//     //         .orElseThrow(() -> new NotFoundException("User games not found"));

//     //     List<Long> gameIds = userGames.stream()
//     //         .map(UserGame::getGameId)
//     //         .collect(Collectors.toList());

//     //     List<GameDto> games = gameClient.getGames(gameIds);

//     //     return userGames.stream()
//     //         .map(userGame -> {
//     //             GameDto gameDto = games.stream()
//     //                 .filter(game -> game.getId().equals(userGame.getGameId()))
//     //                 .findFirst()
//     //                 .orElseThrow(() -> new NotFoundException("Game not found"));
//     //             return new UserGameDto(userGame, gameDto);
//     //         })
//     //         .collect(Collectors.toList());
//     // }
// }

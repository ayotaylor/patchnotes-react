// package com.patchnotes.userservice.service;

// import com.patchnotes.shared.dto.GameDto;
// import com.patchnotes.userservice.client.GameClient;
// import com.patchnotes.userservice.dto.UserGameDto;
// import com.patchnotes.userservice.model.UserGame;
// import com.patchnotes.userservice.repo.UserGameRepository;

// import jakarta.ws.rs.NotFoundException;

// import java.util.List;
// import java.util.stream.Collectors;

// public class UserGameService {
//     private final UserGameRepository userGameRepo;
//     private final GameClient gameClient;

//     public UserGameService(UserGameRepository userGameRepo, GameClient gameClient) {
//         this.userGameRepo = userGameRepo;
//         this.gameClient = gameClient;
//     }

//     public UserGameDto addUserGame(UserGameDto userGameDto) {

//     }

//     public UserGameDto getUserGame(Long userId, Long gameId) {
//         UserGame userGame = userGameRepo.findByUserIdAndGameId(userId, gameId)
//             .orElseThrow(() -> new NotFoundException("User game not found"));

//         GameDto gameDto = gameClient.getGame(userGame.getGameId());

//         return new UserGameDto(userGame, gameDto);
//     }

//     public List<UserGameDto> getUserGames(Long userId) {
//         List<UserGame> userGames = userGameRepo.findByUserId(userId)
//             .orElseThrow(() -> new NotFoundException("User games not found"));

//         List<Long> gameIds = userGames.stream()
//             .map(UserGame::getGameId)
//             .collect(Collectors.toList());

//         List<GameDto> games = gameClient.getGames(gameIds);

//         return userGames.stream()
//             .map(userGame -> {
//                 GameDto gameDto = games.stream()
//                     .filter(game -> game.getId().equals(userGame.getGameId()))
//                     .findFirst()
//                     .orElseThrow(() -> new NotFoundException("Game not found"));
//                 return new UserGameDto(userGame, gameDto);
//             })
//             .collect(Collectors.toList());
//     }
// }

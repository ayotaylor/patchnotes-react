// package com.patchnotes.userservice.controller;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// import com.patchnotes.userservice.dto.UserGameDto;
// import com.patchnotes.userservice.model.UserGame;
// import com.patchnotes.userservice.service.UserGameService;
// import com.patchnotes.userservice.service.UserService;

// import jakarta.ws.rs.NotFoundException;

// import java.util.List;

// @RestController
// @RequestMapping("api/usergames")
// public class UserGameController {
//     private final UserGameService userGameService;

//     public UserGameController(UserGameService userGameService) {
//         this.userGameService = userGameService;
//     }

//     @PostMapping("/users")
//     public ResponseEntity<?> addUserGame(@RequestBody UserGameDto userGame) {

//     }

//     @GetMapping("/users/{userId}/{gameId}")
//     public ResponseEntity<?> getUserGame(@PathVariable Long userId, @PathVariable Long gameId) {
//         try {
//             UserGameDto userGame = userGameService.getUserGame(userId, gameId);
//             return ResponseEntity.ok(userGame);
//         } catch (NotFoundException e) {
//             return ResponseEntity.notFound().build();
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body("User game not found");
//         }
//     }

//     @GetMapping("/users/{userId}")
//     public ResponseEntity<?> getUserGames(@PathVariable Long userId) {
//         try {
//             List<UserGameDto> userGame = userGameService.getUserGames(userId);
//             return ResponseEntity.ok(userGame);
//         } catch (NotFoundException e) {
//             return ResponseEntity.notFound().build();
//         } catch (Exception e) {
//             return ResponseEntity.badRequest().body("User games not found");
//         }
//     }
// }

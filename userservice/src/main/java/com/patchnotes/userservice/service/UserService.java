package com.patchnotes.userservice.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.patchnotes.shared.dto.GameDto;
import com.patchnotes.shared.dto.GameStatusDetailsDto;
import com.patchnotes.shared.dto.UserDto;
import com.patchnotes.shared.dto.UserGameStatusDto;
import com.patchnotes.shared.entity.UserGameStatusId;
import com.patchnotes.shared.enums.GameStatus;
import com.patchnotes.userservice.client.GameClient;
import com.patchnotes.userservice.dto.UserProfileRequest;
import com.patchnotes.userservice.exception.GameClientException;
import com.patchnotes.userservice.model.UserEntity;
import com.patchnotes.userservice.model.UserGameStatusEntity;
import com.patchnotes.userservice.repo.UserGameStatusRepository;
import com.patchnotes.userservice.repo.UserRepository;
import com.patchnotes.userservice.util.UserMapper;

import io.netty.handler.timeout.TimeoutException;
import jakarta.ws.rs.NotFoundException;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final UserGameStatusRepository userGameStatusRepo;
    private final UserMapper userMapper;
    private final GameClient gameClient;

    public UserService(UserRepository userRepo, UserGameStatusRepository userGameStatusRepo,
    UserMapper userMapper, GameClient gameClient) {
        this.userRepo = userRepo;
        this.userGameStatusRepo = userGameStatusRepo;
        this.userMapper = userMapper;
        this.gameClient = gameClient;
    }

    public UserDto getUserProfile(Long id) {
        UserEntity user = userRepo.findById(id)
            .orElseThrow(() -> new NotFoundException("User not found"));

        return userMapper.convertToUserEntityDTO(user);
    }

    public UserDto updateUserProfile(UserProfileRequest user) {
        UserEntity userToUpdate = userRepo.findById(user.getId())
            .orElseThrow(() -> new NotFoundException("User not found"));

        // set values if they are to be updated
        Optional.ofNullable(user.getBio()).ifPresent(userToUpdate::setBio); // userToUpdate.setBio(user.getBio());
        Optional.ofNullable(user.getName()).ifPresent(userToUpdate::setName); // userToUpdate.setName(user.getName());
        Optional.ofNullable(user.getPfp()).ifPresent(userToUpdate::setPfp); // userToUpdate.setPfp(user.getPfp());
        Optional.ofNullable(user.getTopFive()).ifPresent(userToUpdate::setTopFive); // userToUpdate.setTopFive(user.getTopFive());

        UserEntity updatedUser = userRepo.save(userToUpdate);

        return userMapper.convertToUserEntityDTO(updatedUser);
    }

    public UserGameStatusDto getUserGameStatus(Long userId, Long gameId) {
        Objects.requireNonNull(userId, "User ID cannot be null");
        Objects.requireNonNull(gameId, "Game ID cannot be null");
        Optional<UserGameStatusEntity> userGameStatus = userGameStatusRepo.findById(new UserGameStatusId(userId, gameId));

        if (userGameStatus.isPresent()) {
            UserGameStatusDto ugStatusDto = new UserGameStatusDto(userGameStatus.get().getStatus(), userGameStatus.get().getLastUpdated());

            return ugStatusDto;
        }
        return null;
    }

    public UserGameStatusDto setUserGameStatus(Long userId, Long gameId, GameStatus status) {
        UserGameStatusId statusId = new UserGameStatusId(userId, gameId);
        UserGameStatusEntity userGameStatus = userGameStatusRepo.findById(statusId)
            .orElse(new UserGameStatusEntity());

        UserEntity user = userRepo.findById(userId)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        userGameStatus.setId(statusId);
        userGameStatus.setUser(user);
        userGameStatus.setStatus(status);
        userGameStatus.setLastUpdated(LocalDateTime.now());

        userGameStatusRepo.save(userGameStatus);

        //TODO: use some messaging system(kafka) to publish update event

        return new UserGameStatusDto(userGameStatus.getStatus(), userGameStatus.getLastUpdated());
    }

    public List<GameStatusDetailsDto> getGameStatusByStatus(Long userId, GameStatus filterStatus)
        throws GameClientException, TimeoutException {
        List<GameStatusDetailsDto> response = new ArrayList<>();
        List<UserGameStatusEntity> gameStatuses = filterStatus != null ?
            userGameStatusRepo.findByIdUserIdAndStatus(userId, filterStatus).get()
            : userGameStatusRepo.findByIdUserId(userId).get();

        List<Long> gameIds = gameStatuses.stream()
            .map(gs -> gs.getId().getGameId())
            .collect(Collectors.toList());

        List<GameDto> games = gameClient.getGames(gameIds);

        Map<Long, GameDto> gameMap = games.stream()
            .collect(Collectors.toMap(GameDto::getId, game -> game));

        if (gameStatuses != null && gameStatuses.size() > 0) {
            response = gameStatuses.stream()
                .map(g -> {
                    return userMapper.fromEntity(g, gameMap.get(g.getId().getGameId()));
                })
                .collect(Collectors.toList());
        }

        return response;
    }
}

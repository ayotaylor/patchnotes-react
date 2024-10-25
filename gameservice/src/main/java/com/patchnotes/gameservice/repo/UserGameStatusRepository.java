package com.patchnotes.gameservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.patchnotes.gameservice.entity.UserGameStatusEntity;
import com.patchnotes.shared.entity.UserGameStatusId;
import com.patchnotes.shared.enums.GameStatus;

import java.util.List;
import java.util.Optional;

public interface UserGameStatusRepository extends JpaRepository<UserGameStatusEntity, UserGameStatusId> {
    Optional<UserGameStatusEntity> findById(UserGameStatusId id);
    List<UserGameStatusEntity> findByGameId(Long gameId);
    Optional<List<UserGameStatusEntity>> findByIdUserId(Long userId);
    Optional<List<UserGameStatusEntity>> findByIdUserIdAndStatus(Long id, GameStatus status);
}

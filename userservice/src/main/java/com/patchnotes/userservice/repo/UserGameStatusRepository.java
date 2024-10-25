package com.patchnotes.userservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.shared.entity.UserGameStatusId;
import com.patchnotes.shared.enums.GameStatus;
import com.patchnotes.userservice.model.UserGameStatusEntity;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGameStatusRepository extends JpaRepository<UserGameStatusEntity, UserGameStatusId> {
    Optional<UserGameStatusEntity> findById(UserGameStatusId id);
    //Optional<List<UserGameStatusEntity>> findByUserId(Long userId);
    //Optional<List<UserGameStatusEntity>> findByUserIdAndStatus(Long id, GameStatus status);
    Optional<List<UserGameStatusEntity>> findByIdUserId(Long userId);
    Optional<List<UserGameStatusEntity>> findByIdUserIdAndStatus(Long id, GameStatus status);
}

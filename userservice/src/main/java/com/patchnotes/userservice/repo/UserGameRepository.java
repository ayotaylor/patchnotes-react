package com.patchnotes.userservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.userservice.model.UserGame;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserGameRepository extends JpaRepository<UserGame, Long> {
    Optional<List<UserGame>> findByUserId(Long userId);
    Optional<UserGame> findByUserIdAndGameId(long userId, Long gameId);
}

package com.patchnotes.gameservice.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.model.GameEntity;

@Repository
public interface GameRepository extends JpaRepository<GameEntity, Long>{
    @NonNull Optional<GameEntity> findById(@NonNull Long id);
    GameEntity findByIgdbId(@NonNull Long id);
    List<GameEntity> findAllByIgdbIdIn(List<Long> ids);
    List<GameEntity> findAllByIdIn(List<Long> ids);
  }

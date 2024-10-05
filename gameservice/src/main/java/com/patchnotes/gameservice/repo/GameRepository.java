package com.patchnotes.gameservice.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.model.Game;

@Repository
public interface GameRepository extends JpaRepository<Game, Long>{
    @NonNull Optional<Game> findById(@NonNull Long id);
    Game findByIgdbId(@NonNull Long id);
    List<Game> findAllByIgdbIdIn(List<Long> ids);
  }

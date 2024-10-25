package com.patchnotes.gameservice.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.entity.GameEntity;

@Repository
public interface GameRepository extends JpaRepository<GameEntity, Long>{
  String findByIdQuery = "SELECT g FROM GameEntity g " + "LEFT JOIN FETCH g.alternativeNames " + "LEFT JOIN FETCH g.platforms " + "LEFT JOIN FETCH g.genres " + "LEFT JOIN FETCH g.franchises " + "LEFT JOIN FETCH g.collections " + "LEFT JOIN FETCH g.keywords " + "LEFT JOIN FETCH g.languages " + "WHERE g.id = :id";

  @Query(findByIdQuery)
  @NonNull Optional<GameEntity> findById(@NonNull Long id);

  GameEntity findByIgdbId(@NonNull Long id);
  List<GameEntity> findAllByIgdbIdIn(List<Long> ids);
  List<GameEntity> findAllByIdIn(List<Long> ids);
}

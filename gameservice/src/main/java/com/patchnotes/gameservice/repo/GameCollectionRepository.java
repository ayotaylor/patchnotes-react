package com.patchnotes.gameservice.repo;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.entity.GameCollectionEntity;

@Repository
public interface GameCollectionRepository extends JpaRepository<GameCollectionEntity, Long> {
    GameCollectionEntity findByName(String name);

    List<GameCollectionEntity> findAllByNameIn(Set<String> names);
}

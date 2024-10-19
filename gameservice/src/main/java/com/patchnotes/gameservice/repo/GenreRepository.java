package com.patchnotes.gameservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.model.GenreEntity;

import java.util.List;
import java.util.Set;

@Repository
public interface GenreRepository extends JpaRepository<GenreEntity, Long> {
    GenreEntity findByName(String name);
    List<GenreEntity> findAllByNameIn(Set<String> names);
}

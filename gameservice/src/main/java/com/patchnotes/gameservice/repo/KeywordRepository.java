package com.patchnotes.gameservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.model.KeywordEntity;

import java.util.List;
import java.util.Set;

@Repository
public interface KeywordRepository extends JpaRepository<KeywordEntity, Long> {
    KeywordEntity findByName(String name);
    List<KeywordEntity> findAllByNameIn(Set<String> names);
}

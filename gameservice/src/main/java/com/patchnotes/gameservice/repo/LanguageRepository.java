package com.patchnotes.gameservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.model.LanguageEntity;

import java.util.List;
import java.util.Set;

@Repository
public interface LanguageRepository extends JpaRepository<LanguageEntity, Long> {
    LanguageEntity findByName(String name);
    List<LanguageEntity> findAllByNameIn(Set<String> names);

}

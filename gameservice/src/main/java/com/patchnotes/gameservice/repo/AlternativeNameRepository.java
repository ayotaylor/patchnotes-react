package com.patchnotes.gameservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.model.AlternativeNameEntity;

import java.util.List;
import java.util.Set;


@Repository
public interface AlternativeNameRepository extends JpaRepository<AlternativeNameEntity, Long>{
    // AlternativeNameEntity findByName(String name);
    // List<AlternativeNameEntity> findByAllByNameIn(Set<String> name);
}

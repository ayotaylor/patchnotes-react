package com.patchnotes.gameservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.model.FranchiseEntity;

import java.util.List;
import java.util.Set;

@Repository
public interface FranchiseRepository extends JpaRepository<FranchiseEntity, Long> {
    FranchiseEntity findByName(String name);
    List<FranchiseEntity> findAllByNameIn(Set<String> name);
}

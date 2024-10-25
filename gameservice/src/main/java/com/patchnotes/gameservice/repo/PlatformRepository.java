package com.patchnotes.gameservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.gameservice.entity.PlatformEntity;

import java.util.List;
import java.util.Set;

@Repository
public interface PlatformRepository extends JpaRepository<PlatformEntity, Long> {
    PlatformEntity findByName(String name);
    List<PlatformEntity> findAllByNameIn(Set<String> names);

}

package com.patchnotes.userservice.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.patchnotes.userservice.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
  Optional<User> findByUsername(String username);
  Optional<User> findByEmail(String email);
  //@NonNull Optional<User> findById(@NonNull Long id);
}


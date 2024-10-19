package com.patchnotes.userservice.service;

import org.springframework.stereotype.Service;

import com.patchnotes.shared.dto.UserDto;
import com.patchnotes.userservice.model.UserEntity;
import com.patchnotes.userservice.repo.UserRepository;
import com.patchnotes.userservice.util.UserMapper;

import jakarta.ws.rs.NotFoundException;

@Service
public class UserService {
    private final UserRepository userRepo;
    private final UserMapper userMapper;

    public UserService(UserRepository userRepo, UserMapper userMapper) {
        this.userRepo = userRepo;
        this.userMapper = userMapper;
    }

    public UserDto getUserProfile(Long id) {
        UserEntity user = userRepo.findById(id)
            .orElseThrow(() -> new NotFoundException("User not found"));

        return userMapper.convertToDTO(user);
    }

    public UserDto updateUserProfile(UserEntity user) {
        UserEntity userToUpdate = userRepo.findById(user.getId())
            .orElseThrow(() -> new NotFoundException("User not found"));

        userToUpdate.setBio(user.getBio());
        userToUpdate.setName(user.getName());
        userToUpdate.setPfp(user.getPfp());
        userToUpdate.setTopFive(user.getTopFive());

        UserEntity updatedUser = userRepo.save(user);

        return userMapper.convertToDTO(updatedUser);
    }
}

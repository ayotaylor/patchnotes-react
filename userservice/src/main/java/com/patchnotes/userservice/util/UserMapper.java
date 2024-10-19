package com.patchnotes.userservice.util;

import org.springframework.stereotype.Service;

import com.patchnotes.shared.dto.UserDto;
import com.patchnotes.userservice.model.UserEntity;

@Service
public class UserMapper {
    public UserDto convertToDTO(UserEntity userEntity) {
        UserDto userDto = new UserDto();
        userDto.setUsername(userEntity.getUsername());
        userDto.setName(userEntity.getName());
        userDto.setEmail(userEntity.getEmail());
        userDto.setBio(userEntity.getBio());
        userDto.setPfp(userEntity.getPfp());
        userDto.setTopFive(userEntity.getTopFive());

        return userDto;
    }
}

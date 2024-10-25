package com.patchnotes.userservice.util;

import org.springframework.stereotype.Service;

import com.patchnotes.shared.dto.GameDto;
import com.patchnotes.shared.dto.GameStatusDetailsDto;
import com.patchnotes.shared.dto.UserDto;
import com.patchnotes.shared.dto.UserGameStatusDto;
import com.patchnotes.userservice.model.UserEntity;
import com.patchnotes.userservice.model.UserGameStatusEntity;

@Service
public class UserMapper {
    public UserDto convertToUserEntityDTO(UserEntity userEntity) {
        UserDto userDto = new UserDto();
        userDto.setUsername(userEntity.getUsername());
        userDto.setName(userEntity.getName());
        userDto.setEmail(userEntity.getEmail());
        userDto.setBio(userEntity.getBio());
        userDto.setPfp(userEntity.getPfp());
        userDto.setTopFive(userEntity.getTopFive());

        return userDto;
    }

    public UserGameStatusDto convertUserGameStatusToDto(UserGameStatusEntity entity) {
        return new UserGameStatusDto(entity.getStatus(), entity.getLastUpdated());
    }

    public GameStatusDetailsDto fromEntity(UserGameStatusEntity entity, GameDto game) {
        return new GameStatusDetailsDto(game, entity.getStatus(), entity.getLastUpdated());
    }
}

package com.patchnotes.userservice.service;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.patchnotes.shared.dto.UserDto;
import com.patchnotes.userservice.dto.LoginDto;
import com.patchnotes.userservice.dto.RegisterDto;
import com.patchnotes.userservice.exception.ApiRequestException;
import com.patchnotes.userservice.model.JwtToken;
import com.patchnotes.userservice.model.UserEntity;
import com.patchnotes.userservice.model.UserType;
import com.patchnotes.userservice.repo.UserRepository;
import com.patchnotes.userservice.util.JwtUtil;
import com.patchnotes.userservice.util.UserMapper;

@Service
public class AuthService {
    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final JwtUtil jwtUtil;

    private final UserMapper userMapper;

    public AuthService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            UserMapper userMapper) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
    }

    public UserDto register(RegisterDto input) throws Exception {

        Optional<UserEntity> existingUserByUsername = userRepository.findByUsername(input.getUsername());
        if (existingUserByUsername.isPresent()) {
            throw new Exception("Username already exists");
        }

        Optional<UserEntity> existingUserByEmail = userRepository.findByEmail(input.getEmail());
        if (existingUserByEmail.isPresent()) {
            throw new Exception("Email already registered");
        }

        UserEntity user = new UserEntity();
        user.setUsername(input.getUsername());
        user.setName(input.getName());
        user.setEmail(input.getEmail());
        user.setPassword(passwordEncoder.encode(input.getPassword()));
        user.setUserType(UserType.REGULAR);

        UserEntity savedUser = userRepository.save(user);

        return userMapper.convertToDTO(savedUser);
    }

    public JwtToken authenticate(LoginDto input) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getUsername(),
                            input.getPassword()));

            UserEntity authenticatedUser = userRepository.findByUsername(input.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            String token = jwtUtil.generateToken(authenticatedUser);
            JwtToken jwtToken = new JwtToken();
            jwtToken.setToken(token);
            jwtToken.setExpiration(jwtUtil.getExpirationTime());

            return jwtToken;
        } catch (AuthenticationException e) {
            throw new ApiRequestException("Invalid login credentials", HttpStatus.NOT_FOUND);
        } catch (RuntimeException e) {
            throw new ApiRequestException("Invalid login credentials", HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            throw new ApiRequestException("Invalid login credentials: Something else wrong", HttpStatus.NOT_FOUND);
        }
    }
}

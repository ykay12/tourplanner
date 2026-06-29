package org.tour.tourplannerbackend.presentation.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.presentation.dto.frontend.LoginDto;
import org.tour.tourplannerbackend.presentation.dto.frontend.LoginResponseDto;
import org.tour.tourplannerbackend.presentation.dto.frontend.RegisterDto;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.business.service.AuthService;
import org.tour.tourplannerbackend.business.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    private static final Logger LOGGER = LogManager.getLogger(AuthController.class);

    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @CrossOrigin
    @PostMapping("/register")
    public User register(@RequestBody RegisterDto registerDto) {
        LOGGER.info("Register request received for username={}", registerDto != null ? registerDto.getUsername() : null);

        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword());

        User createdUser = userService.createUser(user);
        LOGGER.info("User registered successfully. userId={}, username={}", createdUser.getId(), createdUser.getUsername());

        return createdUser;
    }

    @CrossOrigin
    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginDto loginDto) {
        LOGGER.info("Login request received for username={}", loginDto != null ? loginDto.getUsername() : null);

        LoginResponseDto response = authService.login(loginDto);
        LOGGER.info("Login successful. userId={}, username={}", response.getUserId(), response.getUsername());

        return response;
    }
}
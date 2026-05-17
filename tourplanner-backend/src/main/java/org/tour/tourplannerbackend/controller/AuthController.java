package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.dto.frontend.LoginDto;
import org.tour.tourplannerbackend.dto.frontend.LoginResponseDto;
import org.tour.tourplannerbackend.dto.frontend.RegisterDto;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.service.AuthService;
import org.tour.tourplannerbackend.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    @CrossOrigin
    @PostMapping("/register")
    public User register(@RequestBody RegisterDto registerDto) {
        User user = new User();
        user.setUsername(registerDto.getUsername());
        user.setEmail(registerDto.getEmail());
        user.setPassword(registerDto.getPassword());

        return userService.createUser(user);
    }

    @CrossOrigin
    @PostMapping("/login")
    public LoginResponseDto login(@RequestBody LoginDto loginDto) {
        return authService.login(loginDto);
    }
}


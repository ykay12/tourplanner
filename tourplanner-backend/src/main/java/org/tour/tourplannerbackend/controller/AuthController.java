package org.tour.tourplannerbackend.controller;

import org.springframework.boot.webmvc.autoconfigure.WebMvcProperties;
import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.dto.AuthDto;
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
    public User register(@RequestBody AuthDto authUser) {
        User user = new User();
        user.setUsername(authUser.getUsername());
        user.setPassword(authUser.getPassword());

        return userService.createUser(user);
    }

    @CrossOrigin
    @PostMapping("/login")
    public String login(@RequestBody AuthDto authDto) {
        return authService.login(authDto);
    }
}


package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.createUser(user);
    }

    @CrossOrigin
    @PostMapping("/login")
    public String login() {
        // Struktur-Platzhalter; echte Auth folgt später mit Security/JWT.
        return "LOGIN_PLACEHOLDER";
    }
}


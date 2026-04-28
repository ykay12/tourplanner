package org.tour.tourplannerbackend.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.dto.AuthDto;
import org.tour.tourplannerbackend.exception.UnauthorizedException;
import org.tour.tourplannerbackend.exception.ValidationException;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String login(AuthDto authDto) {
        if (authDto == null || authDto.getUsername() == null || authDto.getPassword() == null) {
            throw new ValidationException("Username or password required");
        }

        User user = userRepository.findByUsername(authDto.getUsername())
                .orElseThrow(() ->
                        new UnauthorizedException("Invalid username or password")
                );

        if (!user.getPassword().equals(authDto.getPassword())) {
            throw new UnauthorizedException("Invalid username or password");
        }
        return generateToken(user.getUsername());
    }


    public String generateToken(String username) {
        return "tourplanner-" + username;
    }

    public String extractUsernameFromToken(String token) {
        if (token == null || !token.startsWith("tourplanner-")) {
            throw new UnauthorizedException("Invalid token");
        }

        String username = token.substring("tourplanner-".length());

        boolean exists = userRepository.existsByUsername(username);

        if (!exists) {
            throw new UnauthorizedException("Invalid token");
        }

        return username;
    }
}

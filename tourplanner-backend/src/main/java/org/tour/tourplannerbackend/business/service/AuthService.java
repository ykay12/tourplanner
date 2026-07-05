package org.tour.tourplannerbackend.business.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.presentation.dto.frontend.LoginDto;
import org.tour.tourplannerbackend.presentation.dto.frontend.LoginResponseDto;
import org.tour.tourplannerbackend.business.exception.UnauthorizedException;
import org.tour.tourplannerbackend.business.exception.ValidationException;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.persistence.repository.UserRepository;

@Service
// Business Layer: Login-Logik und einfaches Token-Handling (statt JWT).
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Prüft die Credentials gegen die DB; bei Erfolg werden Token + User-Infos zurückgegeben.
    public LoginResponseDto login(LoginDto loginDto) {
        if (loginDto == null || loginDto.getUsername() == null || loginDto.getPassword() == null) {
            throw new ValidationException("Username or password required");
        }

        User user = userRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(() ->
                        new UnauthorizedException("Invalid username or password")
                );

        if (!user.getPassword().equals(loginDto.getPassword())) {
            throw new UnauthorizedException("Invalid username or password");
        }

        String token = generateToken(user.getUsername());

        return new LoginResponseDto(token, user.getId(), user.getUsername());
    }


    // Erzeugt einen simplen Token aus dem Username (vereinfachtes Schema für dieses Projekt).
    public String generateToken(String username) {
        return "tourplanner-" + username;
    }

    // Validiert den Token und extrahiert den Username; wird vom AuthInterceptor bei jedem Request genutzt.
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

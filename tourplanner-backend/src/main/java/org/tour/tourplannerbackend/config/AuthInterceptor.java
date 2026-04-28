package org.tour.tourplannerbackend.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.tour.tourplannerbackend.exception.UnauthorizedException;
import org.tour.tourplannerbackend.service.AuthService;

@Component
public class AuthInterceptor implements HandlerInterceptor {
    // AuthService enthält Token-Logik:
    // - Token validieren
    // - Username aus Token extrahieren

    private final AuthService authService;

    public AuthInterceptor(AuthService authService) {
        this.authService = authService;
    }

    // preHandle() wird vor dem eigentlichen Controller ausgeführt.
    // Rückgabe:true  -> Request darf weiter zum Controller
    // false -> Request wird blockiert
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            return true;
        }
        // Authorization: Bearer tourplanner-max

        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Unauthorized");
        }

        String token = authHeader.substring("Bearer ".length());
        String username = authService.extractUsernameFromToken(token);
        // Username im Request speichern, damit Controller/Services später wissen, welcher User aktuell eingeloggt ist
        request.setAttribute("username", username);
        return true;
    }

}

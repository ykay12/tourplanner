package org.tour.tourplannerbackend.business.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Map;

@ControllerAdvice
// @ControllerAdvice fängt Exceptions aus allen Controllern zentral ab
// und mappt sie auf passende HTTP-Statuscodes mit JSON-Fehlermeldung.
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    // NotFoundException -> 404 Not Found
    public ResponseEntity<Map<String, String>> handleNotFound(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("error", messageOrDefault(ex, "Resource not found")));
    }

    @ExceptionHandler(ValidationException.class)
    // ValidationException -> 400 Bad Request
    public ResponseEntity<Map<String, String>> handleValidation(ValidationException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(Map.of("error", messageOrDefault(ex, "Validation failed")));
    }

    @ExceptionHandler(UnauthorizedException.class)
    // UnauthorizedException -> 401 Unauthorized
    public ResponseEntity<Map<String, String>> handleUnauthorized(UnauthorizedException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", messageOrDefault(ex, "Unauthorized")));
    }

    @ExceptionHandler(Exception.class)
    // Fallback: alle unerwarteten Exceptions -> 500 Internal Server Error
    public ResponseEntity<Map<String, String>> handleOther(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", messageOrDefault(ex, "Unexpected backend error")));
    }

    // Liefert die Exception-Message oder einen Default-Text.
    private String messageOrDefault(Exception ex, String fallback) {
        return ex.getMessage() != null ? ex.getMessage() : fallback;
    }
}
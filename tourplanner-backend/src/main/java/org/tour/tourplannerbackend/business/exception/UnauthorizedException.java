package org.tour.tourplannerbackend.business.exception;

// fehlende/ungültige Berechtigung (-> 401 im GlobalExceptionHandler).
public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}

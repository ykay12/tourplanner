package org.tour.tourplannerbackend.business.exception;


// ungültiger Input (-> 400 im GlobalExceptionHandler).
public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}


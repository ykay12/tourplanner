package org.tour.tourplannerbackend.business.exception;


//Ressource existiert nicht (-> 404 im GlobalExceptionHandler).
public class NotFoundException extends RuntimeException {
    public NotFoundException(String message) {
        //return message;
    }
}



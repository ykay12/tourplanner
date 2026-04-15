package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.service.TourService;

public class TourController {
    private final TourService tourService;

    //ToDo: Should be solved with dependency Injection!
    public TourController(TourService tourService) {
        this.tourService = tourService;
    }


}

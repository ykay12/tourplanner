package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.service.TourService;

@RestController
public class TourController {
    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    //GET + /tours  -> create a new tour
    @CrossOrigin
    @PostMapping("/tours")
    public Tour createTour(@RequestBody Tour newTour) {
        newTour.setId(null);
        return tourService.saveTour(newTour);
    }
}

package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.service.TourService;

public class TourController {
    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }


    /*
     * @CrossOrigin: Rules on how to access our Data
     *   Browsers usually block requests between different origins (CORS = Cross-Origin Resource Sharing).
     *   with @CrossOrigin I allow other origins (frontend on http://localhost:4200 and backend on http://localhost:8080)
     *   to access
     * @CrossOrigin lässt sich noch weiter einschränken z.B. nur auf http://localhost:4200
     *
     * @PostMapping:
     * Maps HTTP POST requests to /tours
     *
     * @RequestBody
     * Takes JSON from the request body and converts it into a Tour object
     * */
    @CrossOrigin
    @PostMapping("/tours")
    public Tour createTour(@RequestBody Tour newTour) {
        return tourService.saveTour(newTour);
    }
}

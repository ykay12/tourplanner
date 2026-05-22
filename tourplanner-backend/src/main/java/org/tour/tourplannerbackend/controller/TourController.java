package org.tour.tourplannerbackend.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.service.TourService;

import java.util.List;

@RestController
@RequestMapping("/tours")
@CrossOrigin // Erlaubt Requests vom Angular Dev Server:
public class TourController {

    private static final Logger LOGGER = LogManager.getLogger(TourController.class);

    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    // GET /tours -> get all tours
    @GetMapping()
    public List<Tour> getTours() {
        LOGGER.debug("Get all tours request received");

        List<Tour> tours = tourService.getAllTours();
        LOGGER.info("Returned {} tours", tours.size());

        return tours;
    }

    // GET /tours/{id} -> get specific tour
    @GetMapping("/{id}")
    public Tour getTour(@PathVariable Long id) {
        LOGGER.debug("Get tour request received. tourId={}", id);

        Tour tour = tourService.getTour(id);
        LOGGER.info("Returned tour. tourId={}", id);

        return tour;
    }

    // POST /tours -> create a new tour
    @PostMapping()
    public Tour createTour(@RequestBody Tour newTour) {
        LOGGER.info("Create tour request received. name={}, userId={}",
                newTour != null ? newTour.getName() : null,
                newTour != null && newTour.getUser() != null ? newTour.getUser().getId() : null
        );

        newTour.setId(null); //Weil in DB gesetzt wird?
        Tour createdTour = tourService.saveTour(newTour);

        LOGGER.info("Tour created successfully. tourId={}", createdTour.getId());
        return createdTour;
    }

    // PUT /tours/{id} -> update an existing tour
    @PutMapping("/{id}")
    public Tour updateTour(@PathVariable Long id, @RequestBody Tour updatedTour) {
        LOGGER.info("Update tour request received. tourId={}", id);

        Tour tour = tourService.updateTour(id, updatedTour);
        LOGGER.info("Tour updated successfully. tourId={}", id);

        return tour;
    }

    // DELETE /tours/{id} -> delete a specific tour
    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable Long id) {
        LOGGER.info("Delete tour request received. tourId={}", id);

        tourService.deleteTour(id);
        LOGGER.info("Tour deleted successfully. tourId={}", id);
    }
}
package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.service.TourService;

import java.util.List;

@RestController
@RequestMapping("/tours")
@CrossOrigin // Erlaubt Requests vom Angular Dev Server:
public class TourController {
    private final TourService tourService;

    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    // GET /tours -> get all tours
    @GetMapping()
    public List<Tour> getTours() {
        return tourService.getAllTours();
    }

    // GET /tours/{id} -> get specific tour
    @GetMapping("/{id}")
    public Tour getTour(@PathVariable Long id) {
        return tourService.getTour(id);
    }

    // POST /tours -> create a new tour
    @PostMapping()
    public Tour createTour(@RequestBody Tour newTour) {
        newTour.setId(null); //Weil in DB gesetzt wird?
        return tourService.saveTour(newTour);
    }

    // PUT /tours/{id} -> update an existing tour
    @PutMapping("/{id}")
    public Tour updateTour(@PathVariable Long id, @RequestBody Tour updatedTour) {
        return tourService.updateTour(id, updatedTour);
    }

    // DELETE /tours/{id} -> delete a specific tour
    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
    }
}

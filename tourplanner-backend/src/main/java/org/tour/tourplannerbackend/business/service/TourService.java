package org.tour.tourplannerbackend.business.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.business.exception.UnauthorizedException;
import org.tour.tourplannerbackend.presentation.dto.openrouteservice.directions.RouteDetailsDto;
import org.tour.tourplannerbackend.business.exception.NotFoundException;
import org.tour.tourplannerbackend.integration.OpenRouteServiceFacade;
import org.tour.tourplannerbackend.persistence.entity.Tour;
import org.tour.tourplannerbackend.persistence.entity.TourRoute;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.persistence.repository.TourRepository;
import org.tour.tourplannerbackend.persistence.repository.UserRepository;


import java.util.List;

@Service
public class TourService {

    private final TourRepository tourRepo;
    private final UserRepository userRepo;
    private final OpenRouteServiceFacade openRouteServiceFacade;

    public TourService(TourRepository tourRepository,
                       UserRepository userRepository,
                       OpenRouteServiceFacade openRouteServiceFacade) {
        this.tourRepo = tourRepository;
        this.userRepo = userRepository;
        this.openRouteServiceFacade = openRouteServiceFacade;
    }

    public List<Tour> getToursFromUser(Long userId) {
        return tourRepo.findByUserId(userId);
    }

    // Todo: aktuell gibt es keinen extra check um nur die touren von dem jeweiligen user zu holen
    public List<Tour> getAllTours() {
        return tourRepo.findAll();
    }

    public Tour getTour(String username, Long id) {
        Tour tour = tourRepo.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("Tour not found: " + id));

        validateTourOwner(tour, username);
        return tour;
    }

    public void deleteTour(String username, Long id) {
        Tour tour = getTour(username, id);
        tourRepo.deleteById(id);
    }

    public Tour updateTour(String username, Long id, Tour updatedTour) {
        Tour existingTour = getTour(username, id);

        existingTour.setName(updatedTour.getName());
        existingTour.setDescription(updatedTour.getDescription());
        existingTour.setPopularity(updatedTour.getPopularity());
        existingTour.setChildFriendly(updatedTour.getChildFriendly());
        existingTour.setTourType(updatedTour.getTourType());


        // Routes updaten
        // Routes updaten - bisherige Routes von existingTour aus DB löschen
        /* Weil wir in Tour -> orphanRemovalTrue haben, müssen wir die Routes nicht einzeln aus der DB löschen!
        Weil:
            Wenn ein Child (TourRoute) aus der Collection entfernt wird,
            und keine andere Entity mehr darauf zeigt,
            dann wird es automatisch aus der DB gelöscht.

            Das ist also überflüssig:
            if(existingTour.getRoutes() != null) {
                existingTour.getRoutes().forEach( route -> {
                    this.routeRepo.deleteById(route.getId());
                });
                // Nachdem aus DB gelöscht: auch von dem Objekt das ich momentan habe löschen
                existingTour.getRoutes().clear();
            }
        Stattdessen genügt: */
        if (existingTour.getRoutes() != null) {
            existingTour.getRoutes().clear();
        }

        int totalDuration = 0;

        // Routes updaten - für neue Routes id == null und Coordinaten holen
        if (updatedTour.getRoutes() != null) {
            for (TourRoute route : updatedTour.getRoutes()) {
                route.setId(null);// wir müssen die Null setzen, weil die ja automatisch generiert werden sollen!
                //Koordinaten für Routes von OpenRouteService holen
                route.setFromCoordinates(openRouteServiceFacade.getCoordinatesViaNameOfLocation(route.getFrom()));
                route.setToCoordinates(openRouteServiceFacade.getCoordinatesViaNameOfLocation(route.getTo()));

                route.setTour(existingTour);

                // Distance, Duration und Coordinates von neuer Route holen
                RouteDetailsDto routeDetails = this.openRouteServiceFacade.getRouteDetails(
                        route.getFromCoordinates(),
                        route.getToCoordinates(),
                        route.getTransportMode()
                );
                route.setRouteCoordinates(null); //zur sicherheit
                route.setRouteCoordinates(routeDetails.getRouteCoordinates());
                route.setDistance(routeDetails.getDistance());
                route.setDuration(routeDetails.getDuration());
                totalDuration += routeDetails.getDuration().intValue();
            }
            // Routes updaten - neue Routes an existingTour hängen
            //existingTour.setRoutes(updatedTour.getRoutes()); //laut GPT ist untere Version besser, "Denn Hibernate trackt die originale Collection-Instanz."
            existingTour.getRoutes().addAll(updatedTour.getRoutes());
        }

        existingTour.setEstimatedTime(totalDuration);

        // Calculated Values (popularity und childfriendlyness) setzen
        existingTour.calculatePopularityFromNumberOfLogs();
        existingTour.calculateChildFriendliness();

        return tourRepo.save(existingTour);
    }


    public Tour saveTour(String username, Tour newTour) {
        // 1.) Prüfen ob User vorhanden ist und aus DB holen

        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found: " + username));

        newTour.setId(null);
        newTour.setUser(user);
        int totalDuration = 0;

        // 2.) Routes setzen
        if (newTour.getRoutes() != null) {
            for (TourRoute route : newTour.getRoutes()) {
                route.setId(null);              // wir müssen die Null setzen, weil die ja automatisch generiert werden sollen!

                // 3.) Koordinaten für Routes von OpenRouteService holen
                route.setFromCoordinates(openRouteServiceFacade.getCoordinatesViaNameOfLocation(route.getFrom()));
                route.setToCoordinates(openRouteServiceFacade.getCoordinatesViaNameOfLocation(route.getTo()));

                route.setTour(newTour);

                // Distance, Duration und Coordinates von neuer Route holen
                RouteDetailsDto routeDetails = this.openRouteServiceFacade.getRouteDetails(
                        route.getFromCoordinates(),
                        route.getToCoordinates(),
                        route.getTransportMode()
                );
                route.setRouteCoordinates(null); //zur sicherheit
                route.setRouteCoordinates(routeDetails.getRouteCoordinates());
                route.setDistance(routeDetails.getDistance());
                route.setDuration(routeDetails.getDuration());
                totalDuration += routeDetails.getDuration().intValue();

            }
        }

        // 4.) Logs setzen
        if (newTour.getLogs() != null) {
            newTour.getLogs().forEach(log -> {
                log.setId(null); //Wir müssen die Null setzen, weil die ja automatisch generiert werden sollen
                log.setTour(newTour);
            });
        }

        // 5.) Calculated Values (popularity und childfriendlyness) setzen
        newTour.calculatePopularityFromNumberOfLogs();
        newTour.calculateChildFriendliness();

        // 6.) gespeicherte Tour returnieren
        newTour.setEstimatedTime(totalDuration);

        return tourRepo.save(newTour);
    }

    private void validateTourOwner(Tour tour, String username) {
        if (!tour.getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("U are not allowed to access this tour!");
        }
    }
}

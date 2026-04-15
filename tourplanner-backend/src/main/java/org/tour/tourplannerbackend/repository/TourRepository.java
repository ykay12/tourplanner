package org.tour.tourplannerbackend.repository;

import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.model.*;
import org.tour.tourplannerbackend.model.enums.TourType;
import org.tour.tourplannerbackend.model.enums.TransportMode;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TourRepository {

    private final List<Tour> tours = new ArrayList<>();

    public TourRepository() {

        //At the Moment FAKE! -> ToDo: instead of List we want to connect to actual DB!
        // ===== TOUR 1 =====
        List<TourRoute> routes1 = List.of(
                new TourRoute(
                        1L,
                        "Stephansplatz",
                        new Coordinates(48.2082, 16.3738),
                        "Prater",
                        new Coordinates(48.2167, 16.4000),
                        2500,
                        TransportMode.BIKE
                ),
                new TourRoute(
                        2L,
                        "Prater",
                        new Coordinates(48.2167, 16.4000),
                        "Donauinsel",
                        new Coordinates(48.2200, 16.4200),
                        3000,
                        TransportMode.BIKE
                )
        );

        List<Log> logs1 = List.of(
                new Log(
                        1001L,
                        LocalDate.parse("2026-03-20").atStartOfDay(),
                        "Nice ride!",
                        2,
                        5500,
                        3600,
                        4
                )
        );

        tours.add(new Tour(
                1L,
                "Vienna City Ride",
                "A relaxed bike tour through Vienna.",
                3600,
                4,
                true,
                TourType.BIKE,
                routes1,
                logs1
        ));

        // ===== TOUR 2 =====
        List<TourRoute> routes2 = List.of(
                new TourRoute(
                        1L,
                        "Base Camp",
                        new Coordinates(47.0707, 15.4395),
                        "Mid Point",
                        new Coordinates(47.0800, 15.4500),
                        4000,
                        TransportMode.WALK
                ),
                new TourRoute(
                        2L,
                        "Mid Point",
                        new Coordinates(47.0800, 15.4500),
                        "Summit",
                        new Coordinates(47.0900, 15.4600),
                        3500,
                        TransportMode.WALK
                )
        );

        tours.add(new Tour(
                2L,
                "Mountain Hike",
                "Challenging hike with great views.",
                7200,
                3,
                false,
                TourType.HIKE,
                routes2,
                new ArrayList<>() //no logs
        ));

        // ===== TOUR 3 =====
        List<TourRoute> routes3 = List.of(
                new TourRoute(
                        1L,
                        "Stephansplatz",
                        new Coordinates(48.2082, 16.3738),
                        "Donauinsel",
                        new Coordinates(48.2200, 16.4200),
                        4000,
                        TransportMode.WALK
                ),
                new TourRoute(
                        2L,
                        "Donauinsel",
                        new Coordinates(48.2200, 16.4200),
                        "Hauptbahnhof",
                        new Coordinates(48.1859, 16.3750),
                        3500,
                        TransportMode.WALK
                ),
                new TourRoute(
                        3L,
                        "Hauptbahnhof",
                        new Coordinates(48.1859, 16.3750),
                        "Westbahnhof",
                        new Coordinates(48.1965, 16.3370),
                        3500,
                        TransportMode.BIKE
                )
        );

        tours.add(new Tour(
                3L,
                "MixedTour",
                "a mixed tour.",
                7200,
                5,
                false,
                TourType.MIXED,
                routes3,
                new ArrayList<>()
        ));
    }

    /*---------------------------------
             BASIC CRUD
     ----------------------------------*/

    public List<Tour> findAll() {
        return tours;
    }

    //-> At the moment I am just returning all Tours, When DB access I need to filter for User-ID
    public List<Tour> findAllFromUser(Long userId) { return tours; }


    public Tour findById(Long tourId) {
        return tours.stream()
                .filter(t -> t.getId().equals(tourId))
                .findFirst()
                .orElse(null);
    }

    public Tour save(Tour tour) {
        tours.removeIf(t -> t.getId().equals(tour.getId()));
        tours.add(tour);
        return tour;
    }

    public void deleteById(Long tourId) {
        tours.removeIf(t -> t.getId().equals(tourId));
    }
}

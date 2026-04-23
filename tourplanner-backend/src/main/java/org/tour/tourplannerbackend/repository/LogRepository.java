package org.tour.tourplannerbackend.repository;

import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.model.Log;
import org.tour.tourplannerbackend.model.Tour;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class LogRepository {

    private final TourRepository tourRepository;

    public LogRepository(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public List<Log> findByTourId(Long tourId) {
        return tourRepository.findById(tourId)
                .map(tour -> {
                    if (tour.getLogs() == null) {
                        return new ArrayList<Log>();
                    }
                    return new ArrayList<>(tour.getLogs());
                })
                .orElseGet(ArrayList::new);
    }


    public Log save(Long tourId, Log log) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        if (tour.getLogs() == null) {
            tour.setLogs(new ArrayList<>());
        }

        List<Log> logs = tour.getLogs();

        // alten Log entfernen (falls Update)
        logs.removeIf(existing ->
                existing.getId() != null && existing.getId().equals(log.getId())
        );

        // Beziehung setzen (WICHTIG bei JPA!)
        log.setTour(tour);

        logs.add(log);

        tourRepository.save(tour);

        return log;
    }


    public void deleteById(Long tourId, Long logId) {
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new RuntimeException("Tour not found"));

        if (tour.getLogs() == null) {
            return;
        }

        tour.getLogs().removeIf(log ->
                log.getId() != null && log.getId().equals(logId)
        );

        tourRepository.save(tour);
    }

}


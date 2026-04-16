package org.tour.tourplannerbackend.repository;

import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.model.Log;
import org.tour.tourplannerbackend.model.Tour;

import java.util.ArrayList;
import java.util.List;

@Repository
public class LogRepository {

    private final TourRepository tourRepository;

    public LogRepository(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    public List<Log> findByTourId(Long tourId) {
        Tour tour = tourRepository.findById(tourId);
        if (tour == null || tour.getLogs() == null) {
            return new ArrayList<>();
        }
        return new ArrayList<>(tour.getLogs());
    }

    public Log save(Long tourId, Log log) {
        Tour tour = tourRepository.findById(tourId);
        if (tour == null) {
            return null;
        }

        List<Log> logs = tour.getLogs();
        if (logs == null) {
            logs = new ArrayList<>();
            tour.setLogs(logs);
        }

        logs.removeIf(existing -> existing.getId().equals(log.getId()));
        logs.add(log);
        tourRepository.save(tour);
        return log;
    }

    public void deleteById(Long tourId, Long logId) {
        Tour tour = tourRepository.findById(tourId);
        if (tour == null || tour.getLogs() == null) {
            return;
        }
        tour.getLogs().removeIf(log -> log.getId().equals(logId));
        tourRepository.save(tour);
    }
}


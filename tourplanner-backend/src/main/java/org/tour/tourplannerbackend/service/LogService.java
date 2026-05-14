package org.tour.tourplannerbackend.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.exception.NotFoundException;
import org.tour.tourplannerbackend.exception.ValidationException;
import org.tour.tourplannerbackend.model.Log;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.repository.LogRepository;
import org.tour.tourplannerbackend.repository.TourRepository;

import java.util.List;

@Service
public class LogService {

    private final LogRepository logRepository;
    private final TourRepository tourRepository;


    public LogService(LogRepository logRepository, TourRepository tourRepository) {
        this.logRepository = logRepository;
        this.tourRepository = tourRepository;
    }

    public List<Log> getLogsForTour(Long tourId) {
        validateId(tourId, "tourId");
        return logRepository.findByTourId(tourId);
    }

    public Log createOrUpdateLog(Long tourId, Log log) {
        validateId(tourId, "tourId");
        if (log == null) {
            throw new ValidationException("Log must not be null");
        }
        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new NotFoundException("Tour not found: " + tourId));

        log.setTour(tour);

        if (log.getId() == null) {
            throw new ValidationException("Log id must not be null");
        }
        return logRepository.save(log);
    }

    public void deleteLog(Long tourId, Long logId) {
        validateId(tourId, "tourId");
        validateId(logId, "logId");
        Log log = logRepository.findById(logId)
                .orElseThrow(() -> new NotFoundException("Log not found: " + logId));

        if (!log.getTour().getId().equals(tourId)) {
            throw new ValidationException("Log does not belong to tour: " + tourId);
        }

        logRepository.deleteById(logId);
    }

    private void validateId(Long id, String field) {
        if (id == null) {
            throw new ValidationException(field + " must not be null");
        }
    }
}


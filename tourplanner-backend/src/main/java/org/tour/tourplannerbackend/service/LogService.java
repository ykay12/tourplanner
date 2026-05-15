package org.tour.tourplannerbackend.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.exception.NotFoundException;
import org.tour.tourplannerbackend.exception.UnauthorizedException;
import org.tour.tourplannerbackend.exception.ValidationException;
import org.tour.tourplannerbackend.model.Log;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.repository.LogRepository;
import org.tour.tourplannerbackend.repository.TourRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogService {

    private final LogRepository logRepository;
    private final TourRepository tourRepository;


    public LogService(LogRepository logRepository, TourRepository tourRepository) {
        this.logRepository = logRepository;
        this.tourRepository = tourRepository;
    }

    public List<Log> getLogsForTour(String username, Long tourId) {
        validateId(tourId, "tourId");

        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new NotFoundException("Tour not found: " + tourId));

        validateTourOwner(tour, username);

        return logRepository.findByTourId(tourId);
    }

    public Log createOrUpdateLog(String username, Long tourId, Log log) {
        validateId(tourId, "tourId");

        if (log == null) {
            throw new ValidationException("Log must not be null");
        }

        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new NotFoundException("Tour not found: " + tourId));

        validateTourOwner(tour, username);

        if (log.getId() != null) {
            Log existingLog = logRepository.findById(log.getId())
                    .orElseThrow(() -> new NotFoundException("Log not found: " + log.getId()));

            if (!existingLog.getTour().getId().equals(tourId)) {
                throw new ValidationException("Log does not belong to tour: " + tourId);
            }
        }

        log.setTour(tour);

        if (log.getId() == null) {
            log.setCreatedAt(LocalDateTime.now());
        }

        return logRepository.save(log);
    }

    public void deleteLog(String username, Long tourId, Long logId) {
        validateId(tourId, "tourId");
        validateId(logId, "logId");

        Log log = logRepository.findById(logId)
                .orElseThrow(() -> new NotFoundException("Log not found: " + logId));

        if (!log.getTour().getId().equals(tourId)) {
            throw new ValidationException("Log does not belong to tour: " + tourId);
        }

        validateTourOwner(log.getTour(), username);

        logRepository.deleteById(logId);
    }

    private void validateId(Long id, String field) {
        if (id == null) {
            throw new ValidationException(field + " must not be null");
        }
    }

    private void validateTourOwner(Tour tour, String username) {
        if (!tour.getUser().getUsername().equals(username)) {
            throw new UnauthorizedException("You are not allowed to access this tour");
        }
    }
}


package org.tour.tourplannerbackend.business.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.business.exception.NotFoundException;
import org.tour.tourplannerbackend.business.exception.UnauthorizedException;
import org.tour.tourplannerbackend.business.exception.ValidationException;
import org.tour.tourplannerbackend.persistence.entity.Log;
import org.tour.tourplannerbackend.persistence.entity.Tour;
import org.tour.tourplannerbackend.persistence.repository.LogRepository;
import org.tour.tourplannerbackend.persistence.repository.TourRepository;

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

    public Log createLog(String username, Long tourId, Log log) {
        validateId(tourId, "tourId");

        if (log == null) {
            throw new ValidationException("Log must not be null");
        }

        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new NotFoundException("Tour not found: " + tourId));

        validateTourOwner(tour, username);

        log.setId(null);
        log.setCreatedAt(LocalDateTime.now());
        log.setTour(tour);

        Log savedLog = logRepository.save(log);

        recalculateTourStats(tour);

        return savedLog;
    }

    public Log updateLog(String username, Long tourId, Long logId, Log log) {
        validateId(tourId, "tourId");
        validateId(logId, "logId");

        if (log == null) {
            throw new ValidationException("Log must not be null");
        }

        Tour tour = tourRepository.findById(tourId)
                .orElseThrow(() -> new NotFoundException("Tour not found: " + tourId));

        validateTourOwner(tour, username);

        Log existingLog = logRepository.findById(logId)
                .orElseThrow(() -> new NotFoundException("Log not found: " + logId));

        if (!existingLog.getTour().getId().equals(tourId)) {
            throw new ValidationException("Log does not belong to tour: " + tourId);
        }

        log.setId(logId);
        log.setCreatedAt(existingLog.getCreatedAt());
        log.setTour(tour);

        Log savedLog = logRepository.save(log);

        recalculateTourStats(tour);

        return savedLog;
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

        //when the number of Logs change -> Popularity in Tour needs to be adapted!
        Tour tourWithDeletedLog = tourRepository.findById(tourId)
                .orElseThrow(() -> new NotFoundException("Tour not found: " + tourId));
        tourWithDeletedLog.calculatePopularityFromNumberOfLogs();
        tourWithDeletedLog.calculateChildFriendliness();
        tourRepository.save(tourWithDeletedLog);
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
    private void recalculateTourStats(Tour tour) {
        tour.calculatePopularityFromNumberOfLogs();
        tour.calculateChildFriendliness();
        tourRepository.save(tour);
    }
}


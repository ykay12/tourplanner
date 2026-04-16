package org.tour.tourplannerbackend.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.exception.ValidationException;
import org.tour.tourplannerbackend.model.Log;
import org.tour.tourplannerbackend.repository.LogRepository;

import java.util.List;

@Service
public class LogService {

    private final LogRepository logRepository;

    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
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
        if (log.getId() == null) {
            throw new ValidationException("Log id must not be null");
        }
        return logRepository.save(tourId, log);
    }

    public void deleteLog(Long tourId, Long logId) {
        validateId(tourId, "tourId");
        validateId(logId, "logId");
        logRepository.deleteById(tourId, logId);
    }

    private void validateId(Long id, String field) {
        if (id == null) {
            throw new ValidationException(field + " must not be null");
        }
    }
}


package org.tour.tourplannerbackend.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.tour.tourplannerbackend.business.exception.NotFoundException;
import org.tour.tourplannerbackend.business.exception.ValidationException;
import org.tour.tourplannerbackend.persistence.entity.Log;
import org.tour.tourplannerbackend.persistence.entity.Tour;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.persistence.repository.LogRepository;
import org.tour.tourplannerbackend.persistence.repository.TourRepository;
import org.tour.tourplannerbackend.business.service.LogService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class LogServiceTests {

    @Mock
    private LogRepository logRepo;
    @Mock
    private TourRepository tourRepo;

    @InjectMocks
    private LogService logService;


    @Test
    public void getLogs() {
        Log log = new Log();
        log.setId(1L);
        log.setComment("comment");

        User user = new User();
        user.setId(1L);
        user.setUsername("max");
        user.setPassword("password");

        Tour tour = new Tour();
        tour.setId(1L);
        tour.setUser(user);

        when(tourRepo.findById(1L)).thenReturn(Optional.of(tour));
        when(logRepo.findByTourId(1L)).thenReturn(List.of(log));

        List<Log> logs = logService.getLogsForTour("max", 1L);

        assertEquals(1, logs.size());
        assertEquals("comment", logs.getFirst().getComment());

        verify(tourRepo).findById(1L);
        verify(logRepo).findByTourId(1L);
    }

    @Test
    public void deleteLog() {
        User user = new User();
        user.setId(1L);
        user.setUsername("max");
        user.setPassword("password");

        Tour tour = new Tour();
        tour.setId(1L);
        tour.setUser(user);

        Log log = new Log();
        log.setId(1L);
        log.setComment("comment");
        log.setTour(tour);

        when(logRepo.findById(1L)).thenReturn(Optional.of(log));
        when(tourRepo.findById(1L)).thenReturn(Optional.of(tour));

        logService.deleteLog("max", 1L, 1L);

        verify(logRepo).findById(1L);
        verify(logRepo).deleteById(1L);
        verify(tourRepo).findById(1L);
        verify(tourRepo).save(tour);
    }

    @Test
    public void createLog() {
        User user = new User();
        user.setId(1L);
        user.setUsername("max");
        user.setPassword("password");

        Tour tour = new Tour();
        tour.setId(1L);
        tour.setUser(user);
        tour.setName("Super tour");

        Log log = new Log();
        log.setId(null);
        log.setComment("comment");
        log.setTour(tour);

        when(tourRepo.findById(1L)).thenReturn(Optional.of(tour));

        when(logRepo.save(Mockito.any(Log.class))).thenAnswer(i -> {
            Log savedLog = i.getArgument(0);
            savedLog.setId(1L);
            return savedLog;
        });

        Log result = logService.createLog("max", 1L, log);

        assertEquals(1L, result.getId());
        assertEquals("comment", result.getComment());
        assertEquals(tour, result.getTour());

        verify(tourRepo).save(tour);
        verify(tourRepo).findById(1L);
        verify(logRepo).save(Mockito.any(Log.class));
    }

    @Test
    public void updateLog() {
        User user = new User();
        user.setId(1L);
        user.setUsername("max");
        user.setPassword("password");

        Tour tour = new Tour();
        tour.setId(1L);
        tour.setUser(user);
        tour.setName("Super tour");

        Log existinglog = new Log();
        existinglog.setId(null);
        existinglog.setComment("old comment");
        existinglog.setTour(tour);

        Log updatedLog = new Log();
        updatedLog.setComment("new comment");

        when(tourRepo.findById(1L)).thenReturn(Optional.of(tour));
        when(logRepo.findById(1L)).thenReturn(Optional.of(existinglog));

        when(logRepo.save(Mockito.any(Log.class))).thenAnswer(i -> {
            Log savedLog = i.getArgument(0);
            savedLog.setId(1L);
            return savedLog;
        });

        Log result = logService.updateLog("max", 1L,1L, updatedLog);

        assertEquals(1L, result.getId());
        assertEquals("new comment", result.getComment());
        assertEquals(tour, result.getTour());

        verify(tourRepo).findById(1L);
        verify(logRepo).findById(1L);
        verify(tourRepo).save(tour);
        verify(logRepo).save(Mockito.any(Log.class));
        verify(tourRepo).save(tour);
    }

    @Test
    public void getLogs_TourNotFound() {
        when(tourRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> logService.getLogsForTour("max", 1L));
    }

    @Test
    public void createLog_WithNullLog() {
        assertThrows(ValidationException.class,
                () -> logService.createLog("max", 1L, null));
    }

    @Test
    public void deleteLog_NotFound() {
        when(logRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class,
                () -> logService.deleteLog("max", 1L, 1L));
    }
}

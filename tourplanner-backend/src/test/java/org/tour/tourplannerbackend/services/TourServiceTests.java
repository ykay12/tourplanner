package org.tour.tourplannerbackend.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.tour.tourplannerbackend.business.exception.NotFoundException;
import org.tour.tourplannerbackend.integration.OpenRouteServiceFacade;
import org.tour.tourplannerbackend.persistence.entity.Tour;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.persistence.repository.TourRepository;
import org.tour.tourplannerbackend.persistence.repository.UserRepository;
import org.tour.tourplannerbackend.business.service.TourService;
import org.tour.tourplannerbackend.business.service.UserService;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TourServiceTests {

    // Erstellt ein Fake-Objekt vom Repository.
    @Mock
    private TourRepository tourRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private OpenRouteServiceFacade openRouteServiceFacade;
    // Mockito erstellt automatisch den TourService und steckt die Mock-Objekte hinein.
    // sonst müsste man schreiben: tourService = new TourService(tourRepository);
    @InjectMocks
    private TourService tourService;

    @Test
    public void findTourById() {
        Tour tour = new Tour();
        tour.setId(1L);
        tour.setName("Tour 1");
        tour.setDescription("Leiwande Tour");

        User user = new User();
        user.setId(1L);
        user.setPassword("password");
        user.setUsername("max");

        tour.setUser(user);

        when(tourRepository.findById(1L)).thenReturn(Optional.of(tour));

        Tour result = tourService.getTour("max", 1L);

        assertEquals("Tour 1", result.getName());

        verify(tourRepository).findById(1L);
    }

    @Test
    public void getTourFromUser() {
        Tour tour = new Tour();
        tour.setId(1L);
        tour.setName("Tour 1");
        tour.setDescription("Leiwande Tour");
        when(tourRepository.findByUserId(1L)).thenReturn(List.of(tour));

        List<Tour> result = tourService.getToursFromUser(1L);
        assertEquals(1, result.size());
        assertEquals("Tour 1", result.getFirst().getName());

        verify(tourRepository).findByUserId(1L);

    }

    @Test
    public void getAllToursFromUser() {
        Tour tour = new Tour();
        tour.setId(1L);
        tour.setName("Tour 1");
        tour.setDescription("Leiwande Tour");

        when(tourRepository.findAll()).thenReturn(List.of(tour));

        List<Tour> result = tourService.getAllTours();
        assertEquals(1, result.size());
        assertEquals("Tour 1", result.getFirst().getName());

        verify(tourRepository).findAll();
    }

    @Test
    public void deleteTour() {
        Tour tour = new Tour();
        tour.setId(1L);
        tour.setName("Tour 1");
        tour.setDescription("Leiwande Tour");

        User user = new User();
        user.setId(1L);
        user.setPassword("password");
        user.setUsername("max");
        tour.setUser(user);

        when(tourRepository.findById(1L)).thenReturn(Optional.of(tour));

        tourService.deleteTour("max", 1L);

        verify(tourRepository).findById(1L);
        verify(tourRepository).deleteById(1L);

    }

    @Test
    public void saveTour() {
        User user = new User();
        user.setId(1L);
        user.setUsername("username");
        user.setPassword("password");
        user.setEmail("email");

        Tour tour = new Tour();
        tour.setId(1L);
        tour.setName("Tour 1");
        tour.setDescription("Leiwande Tour");
        tour.setUser(user);
        tour.setRoutes(new ArrayList<>());

       when(userRepository.findByUsername("username")).thenReturn(Optional.of(user));
        when(tourRepository.save(tour)).thenReturn(tour);

        Tour result = tourService.saveTour("username", tour);
        assertEquals("Tour 1", result.getName());

        verify(userRepository).findByUsername("username");
        verify(tourRepository).save(tour);
    }

    @Test
    public void updateTour() {
        Tour oldTour = new Tour();
        oldTour.setId(1L);
        oldTour.setName("Old Tour");
        oldTour.setDescription("Boring Tour");
        oldTour.setRoutes(new ArrayList<>());

        Tour newTour = new Tour();
        newTour.setId(1L);
        newTour.setName("Tour 1");
        newTour.setDescription("Leiwande Tour");
        newTour.setRoutes(new ArrayList<>());

        User user = new User();
        user.setId(1L);
        user.setPassword("password");
        user.setUsername("max");

        oldTour.setUser(user);
        newTour.setUser(user);

        when(tourRepository.findById(1L)).thenReturn(Optional.of(oldTour));
        when(tourRepository.save(oldTour)).thenReturn(oldTour);

        Tour result = tourService.updateTour("max", 1L, newTour);

        assertEquals("Tour 1", result.getName());
        assertEquals("Leiwande Tour", result.getDescription());

        verify(tourRepository).findById(1L);
        verify(tourRepository).save(oldTour);
    }

    @Test
    public void getTour_NotFound() {
        when(tourRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(NotFoundException.class, () -> tourService.getTour("max", 1L));

        verify(tourRepository).findById(1L);
    }

    @Test
    public void updateTour_NotFound() {
        User user = new User();
        user.setId(1L);
        user.setPassword("password");
        user.setUsername("max");

        when(tourRepository.findById(1L)).thenReturn(Optional.empty());

        Tour updated = new Tour();

        updated.setUser(user);

        assertThrows(NotFoundException.class, () -> tourService.updateTour("max", 1L, updated));

        verify(tourRepository).findById(1L);
    }
}

package org.tour.tourplannerbackend.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.repository.TourRepository;
import org.tour.tourplannerbackend.repository.UserRepository;
import org.tour.tourplannerbackend.service.TourService;
import org.tour.tourplannerbackend.service.UserService;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.ArrayList;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class TourServiceTests {

    // Erstellt ein Fake-Objekt vom Repository.
    @Mock
    private TourRepository tourRepository;
    @Mock
    private UserRepository userRepository;
    // Mockito erstellt automatisch den TourService und steckt die Mock-Objekte hinein.
    // sonst müsste man schreiben: tourService = new TourService(tourRepository);
    @InjectMocks
    private TourService tourService;
    @InjectMocks
    private UserService userService;

    @Test
    public void findTourById(){
        Tour tour = new Tour();
        tour.setId(1L);
        tour.setName("Tour 1");
        tour.setDescription("Leiwande Tour");

        when(tourRepository.findById(1L)).thenReturn(Optional.of(tour));

        Tour result = tourService.getTour(1L);

        assertEquals("Tour 1", result.getName());

        verify(tourRepository).findById(1L);
    }

    @Test
    public void deleteTour(){
        Tour tour = new Tour();
        tour.setId(1L);
        tour.setName("Tour 1");
        tour.setDescription("Leiwande Tour");

        tourService.deleteTour(1L);
        verify(tourRepository).deleteById(1L);

    }
    @Test
    public void saveTour(){
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

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(tourRepository.save(tour)).thenReturn(tour);

        Tour result = tourService.saveTour(tour);
        assertEquals("Tour 1", result.getName());

        verify(userRepository).findById(1L);
        verify(tourRepository).save(tour);
    }

    @Test
    public void updateTour(){
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
        newTour.setPopularity(5);
        newTour.setChildFriendly(true);

        when(tourRepository.findById(1L)).thenReturn(Optional.of(oldTour));
        when(tourRepository.save(oldTour)).thenReturn(oldTour);

        Tour result = tourService.updateTour(1L, newTour);

        assertEquals("Tour 1", result.getName());
        assertEquals("Leiwande Tour", result.getDescription());
        assertEquals(5, result.getPopularity());
        assertEquals(true, result.getChildFriendly());

        verify(tourRepository).findById(1L);
        verify(tourRepository).save(oldTour);
    }
}

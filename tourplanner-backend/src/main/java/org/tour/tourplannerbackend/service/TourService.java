package org.tour.tourplannerbackend.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.repository.TourRepository;


import java.util.List;

@Service
public class TourService {

    //ToDo: Should be solved with dependency Injection!
    private final TourRepository tourRepo;

    public TourService(TourRepository tourRepository) {
        this.tourRepo = tourRepository;
    }

    public List<Tour> getAllToursFromUser(Long userId){
        if(userId == null){
            //throw Error
        }

        List<Tour> userTours = this.tourRepo.findAllFromUser(userId);


        //What do I need to check?
            //if the User has any Tours
        if (userTours.isEmpty()){
            return null; //ToDo: return Error
        }
            //Every Tour needs at least one TourRoute

        // what else?


        return userTours;
    }

}

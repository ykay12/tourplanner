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
        //vorübergehend um Fehler zu finden:

        this.tourRepo = tourRepository;
    }

    /*
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
    */


    public Tour saveTour(Tour newTour) {
        // 1.) Checks ob newTour vollständig

        // 2.) Repo-Funktion aufrufen
        if (newTour.getRoutes() != null) {
            newTour.getRoutes().forEach(route -> {
                route.setId(null);              // wir müssen die Null setzen, weil die ja automatisch generiert werden sollen!
                route.setTour(newTour);
            });
        }

        if (newTour.getLogs() != null) {
            newTour.getLogs().forEach(log -> {
                log.setId(null); //Wir müssen die Null setzen, weil die ja automatisch generiert werden sollen
                log.setTour(newTour);
            });
        }

        Tour savedTour = tourRepo.save(newTour);

        // 3.) Checks ob Return passt -> Hibernate repo.save() returniert die gespeicherte Entity

        // 4.) gespeicherte Tour returnieren
        return savedTour;

    }
}

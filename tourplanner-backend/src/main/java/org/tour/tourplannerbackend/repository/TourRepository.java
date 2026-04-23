package org.tour.tourplannerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.model.*;
import org.tour.tourplannerbackend.model.enums.TourType;
import org.tour.tourplannerbackend.model.enums.TransportMode;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
//
@Repository
public interface TourRepository extends JpaRepository<Tour, Long> { //Long ist der Datentyp des Primary Key der Entity-Klasse Tour

    /*---------------------------------
             BASIC CRUD -> Werden von Hibernate selbst generiert!
             Also die folgenden Funktionen:
                tourRepository.findAll();
                tourRepository.findById(id);
                tourRepository.save(tour);  //returniert die gespeicherte Entity
                tourRepository.deleteById(id);
             Existieren jetzt einfach?!? :O
     ----------------------------------*/



}

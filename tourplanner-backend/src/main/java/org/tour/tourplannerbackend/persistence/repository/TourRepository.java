package org.tour.tourplannerbackend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.persistence.entity.Tour;

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

    List<Tour> findByUserId(Long userId);

}

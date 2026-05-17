package org.tour.tourplannerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.model.TourRoute;

@Repository
public interface RouteRepository extends JpaRepository<TourRoute,Long> {

}

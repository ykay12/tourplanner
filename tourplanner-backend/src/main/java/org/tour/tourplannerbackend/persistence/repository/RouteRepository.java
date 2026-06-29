package org.tour.tourplannerbackend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.persistence.entity.TourRoute;

@Repository
public interface RouteRepository extends JpaRepository<TourRoute,Long> {

}

package org.tour.tourplannerbackend.persistence.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.persistence.entity.Log;

import java.util.List;

@Repository
// Repository Pattern: findByTourId wird von Spring Data JPA aus dem Methodennamen generiert (derived query).
public interface LogRepository extends JpaRepository<Log,Long> {
    List<Log> findByTourId(Long tourId);

}


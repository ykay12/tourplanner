package org.tour.tourplannerbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.model.Log;
import org.tour.tourplannerbackend.model.Tour;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public interface LogRepository extends JpaRepository<Log,Long> {
    List<Log> findByTourId(Long tourId);

}


package org.tour.tourplannerbackend.presentation.mapper;

import org.tour.tourplannerbackend.presentation.dto.frontend.TourDto;
import org.tour.tourplannerbackend.persistence.entity.Tour;

public final class TourMapper {

    private TourMapper() {
    }

    public static TourDto toDto(Tour tour) {
        if (tour == null) {
            return null;
        }
        return new TourDto(tour.getId(), tour.getName(), tour.getDescription(), tour.getTourType());
    }
}


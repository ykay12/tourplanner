package org.tour.tourplannerbackend.mapper;

import org.tour.tourplannerbackend.dto.frontend.TourDto;
import org.tour.tourplannerbackend.model.Tour;

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


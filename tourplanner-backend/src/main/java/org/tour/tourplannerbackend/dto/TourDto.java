package org.tour.tourplannerbackend.dto;

import lombok.Data;
import org.tour.tourplannerbackend.model.enums.TourType;

@Data
public class TourDto {
    private Long id;
    private String name;
    private String description;
    private TourType tourType;
}


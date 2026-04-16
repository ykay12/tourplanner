package org.tour.tourplannerbackend.dto;

import org.tour.tourplannerbackend.model.enums.TourType;

public class TourDto {
    private Long id;
    private String name;
    private String description;
    private TourType tourType;

    public TourDto() {
    }

    public TourDto(Long id, String name, String description, TourType tourType) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.tourType = tourType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public TourType getTourType() {
        return tourType;
    }

    public void setTourType(TourType tourType) {
        this.tourType = tourType;
    }
}


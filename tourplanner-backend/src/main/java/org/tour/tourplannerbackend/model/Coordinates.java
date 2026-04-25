package org.tour.tourplannerbackend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "coordinates")
public class Coordinates {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private Double lat;
    @Column
    private Double lng;

    public Coordinates() {
    }

    public Long  getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Coordinates(Double latitude, Double longitude) {
        this.lat = latitude;
        this.lng = longitude;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double latitude) {
        this.lat = latitude;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double longitude) {
        this.lng = longitude;
    }
}


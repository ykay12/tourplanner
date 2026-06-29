package org.tour.tourplannerbackend.presentation.dto.openrouteservice.directions;

import org.tour.tourplannerbackend.persistence.entity.Coordinates;

import java.util.List;

public class RouteDetailsDto {
    private List<Coordinates> routeCoordinates;
    private Double distance;
    private Double duration;

    public void setRouteCoordinates(List<Coordinates> routeCoordinates) {
        this.routeCoordinates = routeCoordinates;
    }
    public void setDistance(Double distance) {
        this.distance = distance;
    }
    public void setDuration(Double duration) {
        this.duration = duration;
    }

    public List<Coordinates> getRouteCoordinates() {
        return routeCoordinates;
    }
    public Double getDistance() {
        return distance;
    }
    public Double getDuration() {
        return duration;
    }
}

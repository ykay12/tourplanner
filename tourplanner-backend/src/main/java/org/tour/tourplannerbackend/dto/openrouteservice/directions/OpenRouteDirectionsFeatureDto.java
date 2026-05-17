package org.tour.tourplannerbackend.dto.openrouteservice.directions;
import lombok.Data;

@Data
public class OpenRouteDirectionsFeatureDto {
    private String type;

    private OpenRouteDirectionsGeometryDto geometry;

    private OpenRouteDirectionsPropertiesDto properties;
}

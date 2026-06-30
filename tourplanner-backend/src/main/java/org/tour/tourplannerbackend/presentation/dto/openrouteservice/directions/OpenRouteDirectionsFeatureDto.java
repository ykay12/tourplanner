package org.tour.tourplannerbackend.presentation.dto.openrouteservice.directions;
import lombok.Data;

@Data
public class OpenRouteDirectionsFeatureDto {
    private String type;

    private OpenRouteDirectionsGeometryDto geometry;

    private OpenRouteDirectionsPropertiesDto properties;
}

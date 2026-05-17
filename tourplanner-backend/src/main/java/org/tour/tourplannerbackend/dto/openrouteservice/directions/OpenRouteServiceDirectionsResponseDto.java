package org.tour.tourplannerbackend.dto.openrouteservice.directions;

import lombok.Data;
import java.util.List;

@Data
public class OpenRouteServiceDirectionsResponseDto {

    private String type;

    private List<OpenRouteDirectionsFeatureDto> features;
}
package org.tour.tourplannerbackend.dto.openrouteservice.directions;

import lombok.Data;
import java.util.List;

@Data
public class OpenRouteDirectionsGeometryDto {
    private List<List<Double>> coordinates;
}

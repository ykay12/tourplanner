package org.tour.tourplannerbackend.dto;

import java.util.List;
/* We need this class to parse the HTTP Response for https://api.openrouteservice.org/geocode/search?api_key=APIKEY&text=TEXT
"features":
    [
        {
            "type":"Feature",
            "geometry":
                {
                    "type":"Point",
                    "coordinates":[16.370993, 48.212154]
                }
             .
             .
             .
          }
    ]

* */

public class OpenRouteGeometryDto {

    private List<Double> coordinates;

    public List<Double> getCoordinates() {
        return coordinates;
    }

    public void setCoordinates(List<Double> coordinates) {
        this.coordinates = coordinates;
    }

}

package org.tour.tourplannerbackend.dto;

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

public class OpenRouteFeatureDto {

    private OpenRouteGeometryDto geometry;

    public OpenRouteGeometryDto getGeometry() {
        return geometry;
    }

    public void setGeometry(OpenRouteGeometryDto geometry) {
        this.geometry = geometry;
    }

}

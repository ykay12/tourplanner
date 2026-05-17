package org.tour.tourplannerbackend.dto.openrouteservice.geocode;

import java.util.List;

// For Parsing Endpoint: https://api.openrouteservice.org/geocode/search?api_key=APIKEY&text=TEXT  Response
public class OpenRouteServiceGeocodeResponseDto {
    private List<OpenRouteGeocodeFeatureDto> features;

    public List<OpenRouteGeocodeFeatureDto> getFeatures() {
        return features;
    }

    public void setFeatures(List<OpenRouteGeocodeFeatureDto> features) {
        this.features = features;
    }
}

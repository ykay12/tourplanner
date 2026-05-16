package org.tour.tourplannerbackend.dto;

import java.util.List;

// For Parsing Endpoint: https://api.openrouteservice.org/geocode/search?api_key=APIKEY&text=TEXT  Response
public class OpenRouteServiceGeocodeResponseDto {
    private List<OpenRouteFeatureDto> features;

    public List<OpenRouteFeatureDto> getFeatures() {
        return features;
    }

    public void setFeatures(List<OpenRouteFeatureDto> features) {
        this.features = features;
    }
}

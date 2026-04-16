package org.tour.tourplannerbackend.integration;

import org.springframework.stereotype.Component;
import org.tour.tourplannerbackend.config.AppProperties;

@Component
public class OpenRouteServiceClient {

    private final AppProperties appProperties;

    public OpenRouteServiceClient(AppProperties appProperties) {
        this.appProperties = appProperties;
    }

    public String getBaseUrl() {
        return appProperties.getOrsBaseUrl();
    }

    public String getApiKey() {
        return appProperties.getOrsApiKey();
    }
}


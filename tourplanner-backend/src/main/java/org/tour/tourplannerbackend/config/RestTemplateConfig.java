package org.tour.tourplannerbackend.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

// Stellt ein RestTemplate als Spring Bean bereit (wird für HTTP-Calls an OpenRouteService injiziert).
@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
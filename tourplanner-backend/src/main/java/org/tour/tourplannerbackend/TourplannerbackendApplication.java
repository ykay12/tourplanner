package org.tour.tourplannerbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.tour.tourplannerbackend.config.OpenRouteServiceProperties;

//Entry-Point to our Application
@SpringBootApplication
@EnableConfigurationProperties(OpenRouteServiceProperties.class)
public class TourplannerbackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(TourplannerbackendApplication.class, args);
    }

}

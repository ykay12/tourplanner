package org.tour.tourplannerbackend;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.tour.tourplannerbackend.integration.OpenRouteServiceFacade;
import org.tour.tourplannerbackend.persistence.entity.Coordinates;

import static org.junit.jupiter.api.Assertions.*;

/*
* Da es sich um integration tests handelt verwenden sie unsere API-Keys
* Sollten nicht zu oft laufen, da sonst limit der API keys überschritten werden könnte!
*
* */
@SpringBootTest
@ActiveProfiles("test")
public class OpenRouteServiceFacadeIntegrationTests {
    @Autowired
    private OpenRouteServiceFacade openRouteServiceFacade;

    @Test
    void shouldGetCoordinatesForStephansdom() {

        Coordinates coords =
                openRouteServiceFacade.getCoordinatesViaNameOfLocation("Stephansdom");

        assertNotNull(coords);

        // Vienna approx values -> In case the API changes the coords slightly
        assertTrue(coords.getLat() > 48.0);
        assertTrue(coords.getLat() < 49.0);

        assertTrue(coords.getLng() > 16.0);
        assertTrue(coords.getLng() < 17.0);

        System.out.println("Lat: " + coords.getLat());
        System.out.println("Lng: " + coords.getLng());
    }
}

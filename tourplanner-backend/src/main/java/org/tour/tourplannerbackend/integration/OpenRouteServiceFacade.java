package org.tour.tourplannerbackend.integration;

/*  ** OPEN ROUTE SERVICE **

    https://openrouteservice.org/dev/#/api-docs

    ENDPOINT /directions -> for "the distance, and the time should be retrieved by a REST request using the OpenRouteservice.org"
    /v2/directions/{profile} -> works with coordinates
        profile: == transportmode


    ENDPOINT /geocode -> "Resolve input coordinates to addresses and vice versa"
    /geocode/search ->
    "api_key" and "text" are required Query-Params.
    "text" can be: Name of location, street address or postal code.
                    "Spelling matters, but not capitalization when performing a query"

    there are multiple optional Query-Params I think setting boundary.country to "AT" makes sense,
    in order to limit the amount of data that is returned?

    "By default, Pelias returns up to 10 results.  If you want a different number, set the size parameter to the desired number. "

 */


import org.springframework.stereotype.Component;
import org.tour.tourplannerbackend.config.OpenRouteServiceProperties;
import org.tour.tourplannerbackend.model.Coordinates;

import java.net.URI;

@Component
public class OpenRouteServiceFacade {

    private final OpenRouteServiceProperties apiProperties;

    public OpenRouteServiceFacade(OpenRouteServiceProperties apiProperties) {
        this.apiProperties = apiProperties;
    }

    //what are these for?
    public URI getBaseUrl() {
        return apiProperties.getBaseUrl();
    }

    public String getApiKey() {
        return apiProperties.getKey();
    }

    //Functions to get Coordinates
    // -> Since Open Route Service can do both I am implementing both for now?
    public Coordinates getCoordinatesViaNameOfLocation() {
        Coordinates coords = new Coordinates();


    }

    public Coordinates getCoordinatesViaStreetAddress() {

    }
}





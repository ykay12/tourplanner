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
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.tour.tourplannerbackend.config.OpenRouteServiceProperties;
import org.tour.tourplannerbackend.dto.OpenRouteServiceGeocodeResponseDto;
import org.tour.tourplannerbackend.model.Coordinates;
import org.tour.tourplannerbackend.model.enums.OpenRouteServiceProfile;


@Component
public class OpenRouteServiceFacade {

    private final OpenRouteServiceProperties apiProperties;
    private final RestTemplate restTemplate;

    public OpenRouteServiceFacade(OpenRouteServiceProperties apiProperties, RestTemplate restTemplate) {
        this.apiProperties = apiProperties;
        this.restTemplate = restTemplate;
    }

    //Functions to get Coordinates
    public Coordinates getCoordinatesViaNameOfLocation(String locationName) {
        //1.) validation
        if(locationName == null || locationName.isBlank()) {
            throw new IllegalArgumentException("Location name cannot be empty");
        }

        //2.) Anfrage zusammenbauen
        String url = UriComponentsBuilder
                .fromUri(apiProperties.getBaseUrl())
                .path("/geocode/search")
                .queryParam("api_key", apiProperties.getKey())
                .queryParam("text", locationName)
                .queryParam("boundary.country", "AT")
                .toUriString();

        //3.) Anfrage schicken + automatisches parsen in DTO
        OpenRouteServiceGeocodeResponseDto response =
                restTemplate.getForObject(url, OpenRouteServiceGeocodeResponseDto.class);

        //4.) response validation
        if (response == null
                || response.getFeatures() == null
                || response.getFeatures().isEmpty()) {

            throw new RuntimeException("No coordinates found");
        }

        System.out.println(response);

        //5.) Coordinaten Object bauen und zurückgeben
        Coordinates coords = new Coordinates();

        //TODO: check if lat and lng are correct!!
        coords.setLng(response.getFeatures().get(0).getGeometry().getCoordinates().get(0));
        coords.setLat(response.getFeatures().get(0).getGeometry().getCoordinates().get(1));

        return coords;
    }

    //Todo: should we also implement this? But we would have to change Frontend Input fields I think?
    public Coordinates getCoordinatesViaStreetAddress() {
        return new Coordinates();
    }

    //ToDo: Function to call "/v2/directions/{profile}" endpoint -> Retourniert "Waypoints"

}





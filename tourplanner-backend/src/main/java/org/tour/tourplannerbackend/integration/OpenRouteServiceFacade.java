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


import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import org.tour.tourplannerbackend.config.OpenRouteServiceProperties;
import org.tour.tourplannerbackend.dto.openrouteservice.directions.OpenRouteServiceDirectionsResponseDto;
import org.tour.tourplannerbackend.dto.openrouteservice.directions.RouteDetailsDto;
import org.tour.tourplannerbackend.dto.openrouteservice.geocode.OpenRouteServiceGeocodeResponseDto;
import org.tour.tourplannerbackend.model.Coordinates;
import org.tour.tourplannerbackend.model.enums.TransportMode;

import java.util.List;


@Slf4j
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
                .queryParam("text", locationName)
                .queryParam("boundary.country", "AT")
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiProperties.getKey());
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<OpenRouteServiceGeocodeResponseDto> responseEntity =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        OpenRouteServiceGeocodeResponseDto.class
                );
        //3.) Anfrage schicken + automatisches parsen in DTO
        OpenRouteServiceGeocodeResponseDto response = responseEntity.getBody();

        //4.) response validation
        if (response == null
                || response.getFeatures() == null
                || response.getFeatures().isEmpty()) {

            throw new RuntimeException("No coordinates found");
        }

        System.out.println(response);

        //5.) Coordinaten Object bauen und zurückgeben
        Coordinates coords = new Coordinates();

        coords.setLng(response.getFeatures().get(0).getGeometry().getCoordinates().get(0));
        coords.setLat(response.getFeatures().get(0).getGeometry().getCoordinates().get(1));


        return coords;

    }

    //Todo: should we also implement this? But we would have to change Frontend Input fields I think?
    public Coordinates getCoordinatesViaStreetAddress() {
        return new Coordinates();
    }

    /*Function to call "/v2/directions/{profile}" endpoint and return TourDetailsDto that has Details like
    routeCoordinates (for Leaflet-Map in frontend) and distance*/
    public RouteDetailsDto getRouteDetails(Coordinates startPoint, Coordinates endPoint, TransportMode transportMode) {
        // 1.) Profile aus TransportMode ermitteln
        String profile = switch (transportMode) {
            case BIKE -> "cycling-regular";
            case WALK -> "foot-hiking";
            case RUN -> "foot-walking";
            default -> "foot-walking";
        };

        // 2.) make Strings from Coordinates | API Expects string like: "8.681495,49.41461"
        String start = startPoint.getLng() + "," + startPoint.getLat();
        String end = endPoint.getLng() + "," + endPoint.getLat();

        // 3.) Anfrage zusammenbauen
        String url = UriComponentsBuilder
                .fromUri(apiProperties.getBaseUrl())
                .path("/v2/directions/" + profile)
                .queryParam("start", start)
                .queryParam("end", end)
                .toUriString();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", apiProperties.getKey());

        HttpEntity<Void> entity = new HttpEntity<>(headers);

        // 4.) Anfrage schicken + automatisch parsen in DTO
        ResponseEntity<OpenRouteServiceDirectionsResponseDto> responseEntity =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        OpenRouteServiceDirectionsResponseDto.class
                );

        OpenRouteServiceDirectionsResponseDto response = responseEntity.getBody();

        // 5.) Response validieren
        if (response == null
                || response.getFeatures() == null
                || response.getFeatures().isEmpty()) {

            throw new RuntimeException("No route found");
        }

        // 6.) Erstes Feature holen
        var feature = response.getFeatures().get(0);

        // 7.) RouteCoordinates aus API-Response bauen
        List<Coordinates> routeCoordinates =
                feature.getGeometry()
                        .getCoordinates()
                        .stream()
                        .map(point -> {

                            Coordinates coordinate = new Coordinates();

                            // OpenRouteService liefert [lng, lat]
                            coordinate.setLng(point.get(0));
                            coordinate.setLat(point.get(1));

                            return coordinate;
                        })
                        .toList();

        // 8.) RouteDetailsDto bauen
        RouteDetailsDto routeDetails = new RouteDetailsDto();

        routeDetails.setRouteCoordinates(routeCoordinates);

        routeDetails.setDistance(
                feature.getProperties()
                        .getSummary()
                        .getDistance()
        );
        // Todo: route.setDuration(...);
        routeDetails.setDuration(feature.getProperties().getSummary().getDuration());



        // 9.) Debugging
        System.out.println(routeDetails);

        // 10.) RouteDetails zurückgeben
        return routeDetails;

    }

}





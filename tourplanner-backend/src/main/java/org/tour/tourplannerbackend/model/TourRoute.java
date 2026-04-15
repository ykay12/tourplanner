package org.tour.tourplannerbackend.model;


import org.tour.tourplannerbackend.model.enums.TransportMode;

public class TourRoute {

    private Long id;

    private String from;
    private Coordinates fromCoordinates; // kann null sein

    private String to;
    private Coordinates toCoordinates; // kann null sein

    private double distance;
    private TransportMode transportMode;

    // Konstruktoren
    public TourRoute() {
    }

    public TourRoute(Long id, String from, Coordinates fromCoordinates,
                     String to, Coordinates toCoordinates,
                     double distance, TransportMode transportMode) {
        this.id = id;
        this.from = from;
        this.fromCoordinates = fromCoordinates;
        this.to = to;
        this.toCoordinates = toCoordinates;
        this.distance = distance;
        this.transportMode = transportMode;
    }

    // Getter & Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public Coordinates getFromCoordinates() {
        return fromCoordinates;
    }

    public void setFromCoordinates(Coordinates fromCoordinates) {
        this.fromCoordinates = fromCoordinates;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public Coordinates getToCoordinates() {
        return toCoordinates;
    }

    public void setToCoordinates(Coordinates toCoordinates) {
        this.toCoordinates = toCoordinates;
    }

    public double getDistance() {
        return distance;
    }

    public void setDistance(double distance) {
        this.distance = distance;
    }

    public TransportMode getTransportMode() {
        return transportMode;
    }

    public void setTransportMode(TransportMode transportMode) {
        this.transportMode = transportMode;
    }
}

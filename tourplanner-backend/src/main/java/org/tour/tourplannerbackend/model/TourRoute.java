package org.tour.tourplannerbackend.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import org.tour.tourplannerbackend.model.enums.TransportMode;

@Entity
@Table(name = "tour_route")
public class TourRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String from;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "from_coordinates_id")
    private Coordinates fromCoordinates; // kann null sein

    @Column
    private String to;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "to_coordinates_id") //Coordinates sind eine eigene Entity (kein Basis-Datentyp) deswegen muss ich hier @OneToOne verwenden, statt einfach @Column
    private Coordinates toCoordinates; // kann null sein

    @Column
    private double distance;

    @Enumerated(EnumType.STRING)
    private TransportMode transportMode;

    @JsonBackReference("tour-routes")
    @ManyToOne
    private Tour tour;

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

    public Tour getTour() {
        return tour;
    }

    public void setTour(Tour tour) {
        this.tour = tour;
    }
}

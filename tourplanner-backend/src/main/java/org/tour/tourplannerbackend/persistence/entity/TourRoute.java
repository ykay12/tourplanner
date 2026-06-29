package org.tour.tourplannerbackend.persistence.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.tour.tourplannerbackend.persistence.entity.enums.TransportMode;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tour_route")
public class TourRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "from_location") //from ist ein reserviertes keyword
    private String from;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "from_coordinates_id")
    private Coordinates fromCoordinates; // kann null sein

    @Column(name = "to_location") //to ist ein reserviertes keyword
    private String to;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "to_coordinates_id") //Coordinates sind eine eigene Entity (kein Basis-Datentyp) deswegen muss ich hier @OneToOne verwenden, statt einfach @Column
    private Coordinates toCoordinates; // kann null sein

    @Column
    private Double distance;

    @Column
    private Double duration;

    @Enumerated(EnumType.STRING)
    private TransportMode transportMode;

    @JsonBackReference("tour-routes")
    @JoinColumn(name = "tour_id")
    @ManyToOne
    private Tour tour;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "tour_route_id")
    private List<Coordinates> routeCoordinates; //This is to display correct and not only direct lines with leaflet in the frontend
}

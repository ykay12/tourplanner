package org.tour.tourplannerbackend.model;

import jakarta.persistence.*;
import org.tour.tourplannerbackend.model.enums.TransportMode;

@Entity
@Table(name = "mixed_segment")
public class MixedSegment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String to;

    @Column
    private TransportMode transportMode;

    public MixedSegment() {
    }

    public MixedSegment(String to, TransportMode transportMode) {
        this.to = to;
        this.transportMode = transportMode;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public TransportMode getTransportMode() {
        return transportMode;
    }

    public void setTransportMode(TransportMode transportMode) {
        this.transportMode = transportMode;
    }
}

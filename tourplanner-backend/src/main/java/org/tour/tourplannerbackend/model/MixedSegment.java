package org.tour.tourplannerbackend.model;

import org.tour.tourplannerbackend.model.enums.TransportMode;

public class MixedSegment {

    private String to;
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

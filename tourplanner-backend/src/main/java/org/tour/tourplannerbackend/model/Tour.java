package org.tour.tourplannerbackend.model;

import org.tour.tourplannerbackend.model.enums.TourType;

import java.util.List;

public class Tour {

    private Long id; // wollen wir number oder UUID?
    private String name;
    private String description;
    private int estimatedTime;
    private int popularity;
    private boolean isChildfriendly;
    private TourType tourType;
    private List<TourRoute> routes;
    private List<Log> logs;

    // Konstruktoren
    public Tour() {
    }

    public Tour(Long id, String name, String description, int estimatedTime,
                int popularity, boolean isChildfriendly,
                TourType tourType, List<TourRoute> routes, List<Log> logs) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.estimatedTime = estimatedTime;
        this.popularity = popularity;
        this.isChildfriendly = isChildfriendly;
        this.tourType = tourType;
        this.routes = routes;
        this.logs = logs;
    }

    // Getter & Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getEstimatedTime() {
        return estimatedTime;
    }

    public void setEstimatedTime(int estimatedTime) {
        this.estimatedTime = estimatedTime;
    }

    public int getPopularity() {
        return popularity;
    }

    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }

    public boolean isChildfriendly() {
        return isChildfriendly;
    }

    public void setChildfriendly(boolean childfriendly) {
        isChildfriendly = childfriendly;
    }

    public TourType getTourType() {
        return tourType;
    }

    public void setTourType(TourType tourType) {
        this.tourType = tourType;
    }

    public List<TourRoute> getRoutes() {
        return routes;
    }

    public void setRoutes(List<TourRoute> routes) {
        this.routes = routes;
    }

    public List<Log> getLogs() {
        return logs;
    }

    public void setLogs(List<Log> logs) {
        this.logs = logs;
    }
}


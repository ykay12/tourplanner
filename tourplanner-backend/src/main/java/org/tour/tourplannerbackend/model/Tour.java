package org.tour.tourplannerbackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import org.tour.tourplannerbackend.model.enums.TourType;

import java.util.List;

/*
* Um Hibernate zu verwenden, damit die Klasse direkt in die DB eingefügt werden kann,
* Annotiere ich unsere allgemeine model-Klasse zu einer @Entity
*
* */

@Entity
@Table(name = "tour")
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // wollen wir number oder UUID?

    @Column
    private String name;
    @Column
    private String description;
    @Column
    private int estimatedTime;
    @Column
    private int popularity;
    @Column
    private boolean isChildfriendly;

    @Enumerated(EnumType.STRING)
    private TourType tourType;

    @JsonManagedReference("tour-routes")
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourRoute> routes;

    @JsonManagedReference("tour-logs")
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
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


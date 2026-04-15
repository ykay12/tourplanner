package org.tour.tourplannerbackend.model;

import java.time.LocalDateTime;

public class Log {

    private Long id;
    private LocalDateTime createdAt; // entspricht Date in TS
    private String comment;
    private int difficulty;
    private double totalDistance;
    private int totalTime; // Sekunden
    private int rating;

    // Konstruktoren
    public Log() {
    }

    public Log(Long id, LocalDateTime createdAt, String comment,
               int difficulty, double totalDistance,
               int totalTime, int rating) {
        this.id = id;
        this.createdAt = createdAt;
        this.comment = comment;
        this.difficulty = difficulty;
        this.totalDistance = totalDistance;
        this.totalTime = totalTime;
        this.rating = rating;
    }

    // Getter & Setter

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }

    public double getTotalDistance() {
        return totalDistance;
    }

    public void setTotalDistance(double totalDistance) {
        this.totalDistance = totalDistance;
    }

    public int getTotalTime() {
        return totalTime;
    }

    public void setTotalTime(int totalTime) {
        this.totalTime = totalTime;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}


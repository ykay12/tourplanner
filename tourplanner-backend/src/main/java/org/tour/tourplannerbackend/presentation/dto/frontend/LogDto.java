package org.tour.tourplannerbackend.presentation.dto.frontend;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class LogDto {
    private Long id;
    private LocalDateTime createdAt;
    private String comment;
    private int difficulty;
    private double totalDistance;
    private int totalTime;
    private int rating;
}
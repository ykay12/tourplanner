package org.tour.tourplannerbackend.persistence.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "log")
public class Log {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private LocalDateTime createdAt; // entspricht Date in TS
    @Column
    private String comment;
    @Column
    private Integer difficulty;
    @Column
    private Double totalDistance;
    @Column
    private Integer totalTime; // Sekunden
    @Column
    private Integer rating;

    @JsonBackReference("tour-logs")
    @ManyToOne
    private Tour tour;

}


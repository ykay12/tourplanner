package org.tour.tourplannerbackend.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.tour.tourplannerbackend.model.enums.TourType;

import java.util.List;

/*
 * Um Hibernate zu verwenden, damit die Klasse direkt in die DB eingefügt werden kann,
 * Annotiere ich unsere allgemeine model-Klasse zu einer @Entity
 *
 *
 * ToDo: Validations-Annotationen ergänzen (siehe Foliensatz vom 23.04.)
 * */

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "tours")
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // wollen wir number oder UUID?

    @Column
    private String name;
    @Column
    private String description;
    @Column
    private Integer estimatedTime;
    @Column
    private Integer popularity;
    @Column
    private Boolean childFriendly;

    @Enumerated(EnumType.STRING)
    private TourType tourType;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @JsonManagedReference("tour-routes")
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TourRoute> routes;

    @JsonManagedReference("tour-logs")
    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Log> logs;


}


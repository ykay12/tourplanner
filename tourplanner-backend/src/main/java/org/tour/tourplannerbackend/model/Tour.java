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

    public void calculatePopularityFromNumberOfLogs() {
        int numberOfLogs = logs == null ? 0 : logs.size();

        // Anzahl an Logs == popularity, weil wir keine genauere Spezifikation haben und es am einfachsten testbar ist
        // (wäre in der Realität wohl von der durchschnittlichen Anzahl an Logs abhängig)
        if (numberOfLogs == 0) {
            popularity = 0;
        } else if (numberOfLogs <= 1) {
            popularity = 1;
        } else if (numberOfLogs <= 2) {
            popularity = 2;
        } else if (numberOfLogs <= 3) {
            popularity = 3;
        } else if (numberOfLogs <= 4) {
            popularity = 4;
        } else {
            popularity = 5;
        }
    }

    public boolean logExists(Long logId){
        for(Log existingLog : logs){
            if(existingLog.getId().equals(logId)){
                return true;
            }
        }
        return false;
    }

}


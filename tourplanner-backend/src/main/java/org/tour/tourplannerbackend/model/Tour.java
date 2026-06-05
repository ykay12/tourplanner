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

    public void calculateChildFriendliness(){
        //Specification: "child-friendliness (derived from recorded difficulty values, total times and distance)"
        //difficulty and time from Logs
        double difficultySum = 0;
        double timeSum = 0;
        int numberOfLogs = logs == null ? 0 : logs.size();

        if (numberOfLogs == 0) {
            childFriendly = false; //Weil wir nichts dazu sagen können, besser false!
            return;
        }

        for(Log log : logs){
            difficultySum = difficultySum + log.getDifficulty();
            timeSum = timeSum + log.getTotalTime();
        }
        double averageDifficulty = difficultySum / numberOfLogs;
        double averageTime = timeSum / numberOfLogs;

        //distance from TourRoutes
        double totalDistance = 0;
        for(TourRoute route : routes){
            totalDistance = totalDistance + route.getDistance();
        }

        /*Berechnungsüberlegung:
        * Mit kindern will ich nicht länger als 4 Stunden unterwegs sein.
        * Laut https://www.wandern-mit-familie.de/2025/05/die-wandern-mit-familie-zeit-faustregel/
        * können Kinder 2km/stunde gehen.
        *   -> wenn die totalDistance > 8000 (8 km) ist, ist die Tour nicht Child-Friendly
        *   -> wenn averageTime > 14400 (14400 sekunden entspricht 4 Stunden), ist die Tour nicht Child-Friendly
        *
        * Zu letzt denke ich noch, dass die Difficulty nicht > 3 sein sollte, um KinderFreundlich zu sein
        *
        * */

        childFriendly = totalDistance <= 8000 && // == 8km
                        averageTime <= 14400 && // == 4 Std
                        averageDifficulty <= 3;
    }

}


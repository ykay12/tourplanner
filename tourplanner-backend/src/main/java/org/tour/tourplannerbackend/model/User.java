package org.tour.tourplannerbackend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

//At the moment: POJO -> Should be Bean?
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users") //darf nicht "user" heißen -> reserviertes keyword! Wie oft will ich disen Fehler noch machen?
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true, nullable = false)
    private String username;
    @Column(unique = false, nullable = false)
    private String email;
    @Column(nullable = false) //so that we don't persist the clear-text-pw -> depends on if it is hashed here / otherwise just @Column
    private String password;

}

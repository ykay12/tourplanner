package org.tour.tourplannerbackend.model;

import jakarta.persistence.*;

import java.util.UUID;

//At the moment: POJO -> Should be Bean?
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String username;
    @Transient //so that we don't persist the clear-text-pw -> depends on if it is hashed here / otherwise just @Column
    private String password;

    //Constructor
    public User() {}

    //Setter
    public void setId(Long id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    //Getter
    public Long getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
}

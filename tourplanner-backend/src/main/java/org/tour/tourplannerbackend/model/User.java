package org.tour.tourplannerbackend.model;

import java.util.UUID;

//At the moment: POJO -> Should be Bean?
public class User {
    private UUID id;
    private String username;
    private String password;

    //Constructor
    public User() {}

    //Setter
    public void setId(UUID id) {
        this.id = id;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    //Getter
    public UUID getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }
    public String getPassword() {
        return password;
    }
}

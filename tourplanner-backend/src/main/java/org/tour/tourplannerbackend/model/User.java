package org.tour.tourplannerbackend.model;

import java.util.UUID;

//At the moment: POJO -> Should be Bean?
public class User {
    private Long id;
    private String username;
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

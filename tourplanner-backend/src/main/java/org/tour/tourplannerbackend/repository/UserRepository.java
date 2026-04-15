package org.tour.tourplannerbackend.repository;

import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.UUID;


@Repository
public class UserRepository {

    //ToDo: at the moment Fake Repository -> Users managed in a List, not connected to DB
    private final List<User> users = new ArrayList<>();

    public User save(User user) {
        // If user has no ID, assign one (optional depending on our design) -> I think this should actualy happen in the service
        if (user.getId() == null) {
            user.setId(Math.abs(new Random().nextLong()));
        } else {
            // If user already exists, remove old version (update case)
            deleteById(user.getId());
        }
        users.add(user);
        return user;
    }


    public List<User> findAll() {
        return users;
    }


    public User findById(Long id) {
        for (User user : users) {
            if (user.getId().equals(id)) {
                return user;
            }
        }
        return null; //ToDo:  -> throw exception
    }

    public void deleteById(Long id) {
        users.removeIf(user -> user.getId().equals(id));
    }
}

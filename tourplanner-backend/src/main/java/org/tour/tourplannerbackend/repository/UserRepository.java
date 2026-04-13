package org.tour.tourplannerbackend.repository;

import org.springframework.stereotype.Repository;
import org.tour.tourplannerbackend.model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Repository
public class UserRepository {

    //ToDo: at the moment Fake Repository -> Users managed in a List, not connected to DB
    private final List<User> users = new ArrayList<>();

    public User save(User user) {
        // If user has no ID, assign one (optional depending on your design)
        if (user.getId() == null) {
            user.setId(UUID.randomUUID());
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

    public User findById(UUID id) {
        for (User user : users) {
            if (user.getId().equals(id)) {
                return user;
            }
        }
        return null; //ToDo:  -> throw exception
    }

    public void deleteById(UUID id) {
        users.removeIf(user -> user.getId().equals(id));
    }
}

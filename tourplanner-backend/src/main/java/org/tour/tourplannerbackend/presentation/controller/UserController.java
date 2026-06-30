package org.tour.tourplannerbackend.presentation.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.persistence.entity.Tour;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.business.service.TourService;
import org.tour.tourplannerbackend.business.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200") // Erlaubt Requests vom Angular Dev Server:

public class UserController {

    private static final Logger LOGGER = LogManager.getLogger(UserController.class);

    private final UserService userService;
    private final TourService tourService;

    public UserController(UserService userService, TourService tourService ) {
        this.userService = userService;
        this.tourService = tourService;
    }

    // ... existing code ...

    @CrossOrigin
    @GetMapping
    public List<User> getUsers() {
        LOGGER.info("Request received to fetch all users");

        List<User> users = userService.getUsers();
        LOGGER.info("Fetched {} users", users.size());

        return users;
    }

    @CrossOrigin
    @PostMapping
    public User createUser(@RequestBody User user) {
        LOGGER.info("Request received to create user. username={}", user != null ? user.getUsername() : null);

        User createdUser = userService.createUser(user);
        LOGGER.info("User created successfully. userId={}, username={}", createdUser.getId(), createdUser.getUsername());

        return createdUser;
    }

    @GetMapping("/{userId}/tours")
    public List<Tour> getToursFromUser(@PathVariable Long userId) {
        LOGGER.info("Request received to fetch tours for userId={}", userId);

        List<Tour> tours = tourService.getToursFromUser(userId);
        LOGGER.info("Fetched {} tours for userId={}", tours.size(), userId);

        return tours;
    }

    // ... existing code ...

    @CrossOrigin
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        LOGGER.info("Request received to fetch user. userId={}", id);

        User user = userService.getUser(id);
        LOGGER.info("Fetched user successfully. userId={}, username={}", user.getId(), user.getUsername());

        return user;
    }

    // ... existing code ...

    @CrossOrigin
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {
        LOGGER.info("Request received to update user. userId={}, username={}", id, user != null ? user.getUsername() : null);

        user.setId(id);
        User updatedUser = userService.updateUser(user);
        LOGGER.info("User updated successfully. userId={}, username={}", updatedUser.getId(), updatedUser.getUsername());

        return updatedUser;
    }

    // ... existing code ...

    @CrossOrigin
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        LOGGER.info("Request received to delete user. userId={}", id);

        userService.deleteUser(id);
        LOGGER.info("User deleted successfully. userId={}", id);
    }

}
package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.repository.UserRepository;

import java.util.List;
import java.util.UUID;

@RestController
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
    * @CrossOrigin: Rules on how to access our Data
    *   Browsers usually block requests between different origins (CORS = Cross-Origin Resource Sharing).
    *   with @CrossOrigin I allow other origins (frontend on http://localhost:4020 and backend on http://localhost:8080)
    *   to access
    *
    * @PostMapping:
    * Maps HTTP POST requests to /users
    *
    * @RequestBody
    * Takes JSON from the request body and converts it into a User object
    * */
    @CrossOrigin
    @PostMapping("/users")
    public User createUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    /*
    * @GetMapping
    * Maps HTTP GET request to /users
    * */
    @CrossOrigin
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /*
    * @PathVariable
    *
    * */
    @CrossOrigin
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable UUID id) {
        return userRepository.findById(id);
    }

    /*
    * @PutMapping
    * Maps HTTP PUT request to /users/{id}
    * */
    @CrossOrigin
    @PutMapping("/users/{id}")
    public User updateUser(
            @PathVariable UUID id,
            @RequestBody User user
    ) {
        user.setId(id);
        return userRepository.save(user);
    }

    /*
    * @DeleteMapping
    * Maps HTTP DELETE request to /users/{id}*/
    @CrossOrigin
    @DeleteMapping("/users/{id}")
    public void deleteUser(@PathVariable UUID id) {
        userRepository.deleteById(id);
    }

}

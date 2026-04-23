package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.repository.UserRepository;
import org.tour.tourplannerbackend.service.TourService;

import java.util.List;
import java.util.UUID;

/*
* TODO: ich habe mich beim Umsetzen bisher an die Folien gehalten, aber
*  im Unterricht meinte er, dass das Falsch ist,
*   weil der Controller nicht direkt mit den Repos kommunizieren soll,
*   sondern über Services
*   (wir brauchen außerdem Null-Checks (in den Services) -> Errorhandling usw)
* */
@RestController
public class UserController {
    private final UserRepository userRepository;
    private final TourService tourService;

    public UserController(UserRepository userRepository,
                          TourService tourService) {
        this.userRepository = userRepository;
        this.tourService = tourService;
    }

    /*
    * @CrossOrigin: Rules on how to access our Data
    *   Browsers usually block requests between different origins (CORS = Cross-Origin Resource Sharing).
    *   with @CrossOrigin I allow other origins (frontend on http://localhost:4200 and backend on http://localhost:8080)
    *   to access
    * @CrossOrigin lässt sich noch weiter einschränken z.B. nur auf http://localhost:4200
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
    *
    * GET soll keine Nebenwirkungen haben
    *
    * Bei GET all sollte normal pageination sein, damit nicht zu große Mengen an Daten geschickt werden
    * */
    @CrossOrigin
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    /*
    //This should be moved to the Tour Controller
    @CrossOrigin
    @GetMapping("/users/{userId}/tours")
    public List<Tour> getTours(@PathVariable Long userId) {
        return this.tourService.getAllToursFromUser(userId);
    }
    */


    /*
    * @PathVariable
    *
    * */
    @CrossOrigin
    @GetMapping("/users/{id}")
    public User getUser(@PathVariable Long id) {
        return userRepository.findById(id);
    }

    /*
    * @PutMapping
    * Maps HTTP PUT request to /users/{id}
    * */
    @CrossOrigin
    @PutMapping("/users/{id}")
    public User updateUser(
            @PathVariable Long id,
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
    public void deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
    }

}

package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.model.Tour;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.repository.UserRepository;
import org.tour.tourplannerbackend.service.TourService;
import org.tour.tourplannerbackend.service.UserService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http//localhost:4200") // Erlaubt Requests vom Angular Dev Server:

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
    @GetMapping
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @CrossOrigin
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    /*
     * @GetMapping
     * Maps HTTP GET request to /users
     *
     * GET soll keine Nebenwirkungen haben
     *
     * Bei GET all sollte normal pageination sein, damit nicht zu große Mengen an Daten geschickt werden
     * */


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
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) {
        return userService.getUser(id);
    }

    /*
     * @PutMapping
     * Maps HTTP PUT request to /users/{id}
     * */
    @CrossOrigin
    @PutMapping("/{id}")
    public User updateUser(
            @PathVariable Long id,
            @RequestBody User user
    ) {
        user.setId(id);
        return userService.updateUser(user);
    }

    /*
     * @DeleteMapping
     * Maps HTTP DELETE request to /users/{id}*/
    @CrossOrigin
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}

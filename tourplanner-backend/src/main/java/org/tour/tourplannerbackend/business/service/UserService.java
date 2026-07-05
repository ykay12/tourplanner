package org.tour.tourplannerbackend.business.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.business.exception.NotFoundException;
import org.tour.tourplannerbackend.business.exception.ValidationException;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.persistence.repository.UserRepository;

import java.util.List;

@Service
// Business Layer für User-CRUD; kapselt Validierung und den Zugriff auf das UserRepository.
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Legt einen neuen User an, nachdem die Pflichtfelder validiert wurden.
    public User createUser(User user) {
        validateUser(user);
        return userRepository.save(user);
    }

    // Liefert alle User aus der DB.
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Holt einen User per ID oder wirft eine NotFoundException.
    public User getUser(Long id) {
        validateId(id);

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("User not found: " + id));
    }

    // Aktualisiert einen bestehenden User; die ID muss existieren.
    public User updateUser(User user) {
        validateUser(user);

        if (user.getId() == null) {
            throw new ValidationException("User id must not be null for update");
        }

        if (!userRepository.existsById(user.getId())) {
            throw new NotFoundException("User not found: " + user.getId());
        }

        return userRepository.save(user);
    }

    // Löscht einen User per ID oder wirft eine NotFoundException.
    public void deleteUser(Long id) {
        validateId(id);

        if (!userRepository.existsById(id)) {
            throw new NotFoundException("User not found: " + id);
        }

        userRepository.deleteById(id);
    }

    // Zentrale Input-Validierung: Username und Passwort dürfen nicht leer sein.
    private void validateUser(User user) {
        if (user == null) {
            throw new ValidationException("User must not be null");
        }
        if (user.getUsername() == null || user.getUsername().isBlank()) {
            throw new ValidationException("Username must not be blank");
        }
        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new ValidationException("Password must not be blank");
        }
    }

    // Guard-Klausel gegen null-IDs.
    private void validateId(Long id) {
        if (id == null) {
            throw new ValidationException("User id must not be null");
        }
    }
}


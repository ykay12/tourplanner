package org.tour.tourplannerbackend.business.service;

import org.springframework.stereotype.Service;
import org.tour.tourplannerbackend.business.exception.NotFoundException;
import org.tour.tourplannerbackend.business.exception.ValidationException;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.persistence.repository.UserRepository;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        validateUser(user);
        return userRepository.save(user);
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUser(Long id) {
        validateId(id);

        return userRepository.findById(id)
                .orElseThrow(() ->
                        new NotFoundException("User not found: " + id));
    }

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

    public void deleteUser(Long id) {
        validateId(id);

        if (!userRepository.existsById(id)) {
            throw new NotFoundException("User not found: " + id);
        }

        userRepository.deleteById(id);
    }

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

    private void validateId(Long id) {
        if (id == null) {
            throw new ValidationException("User id must not be null");
        }
    }
}


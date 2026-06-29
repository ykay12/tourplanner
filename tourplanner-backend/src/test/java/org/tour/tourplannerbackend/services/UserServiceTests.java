package org.tour.tourplannerbackend.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.tour.tourplannerbackend.business.exception.NotFoundException;
import org.tour.tourplannerbackend.business.exception.ValidationException;
import org.tour.tourplannerbackend.persistence.entity.User;
import org.tour.tourplannerbackend.persistence.repository.UserRepository;
import org.tour.tourplannerbackend.business.service.UserService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTests {
    @Mock
    private UserRepository userRepository;
    @InjectMocks
    private UserService userService;

    @Test
    public void testFindUserById() {
        User user = new User();
        user.setId(1L);
        user.setUsername("username");
        user.setEmail("test@user.com");

        when(userRepository.findById(1L)).thenReturn(java.util.Optional.of(user));

        User result = userService.getUser(1L);

        assertEquals("username", result.getUsername());
        verify(userRepository).findById(1L);
    }

    @Test
    public void deleteUser() {
        when(userRepository.existsById(1L)).thenReturn(true);
        userService.deleteUser(1L);
        verify(userRepository).existsById(1L);
        verify(userRepository).deleteById(1L);
    }

    @Test
    public void saveUser() {
        User user = new User();
        user.setId(1L);
        user.setUsername("username");
        user.setEmail("email");
        user.setPassword("password");

        when(userRepository.save(user)).thenReturn(user);
        User result = userService.createUser(user);

        assertEquals("username", result.getUsername());
        verify(userRepository).save(user);
    }

    @Test
    public void getUsers() {
        User user = new User();
        user.setId(1L);
        user.setUsername("username");

        when(userRepository.findAll()).thenReturn(List.of(user));
        List<User> result = userService.getUsers();
        assertEquals(1, result.size());
        verify(userRepository).findAll();
    }

    @Test
    public void getUser_NotFound() {
        when(userRepository.findById(1L)).thenReturn(java.util.Optional.empty());
        assertThrows(NotFoundException.class, () -> userService.getUser(1L));
        verify(userRepository).findById(1L);
    }

    @Test
    public void getUserWithNullId() {
        assertThrows(ValidationException.class, () -> userService.getUser(null));
    }

    @Test
    public void createUserWithBlankUsername() {
        User user = new User();
        user.setUsername("");
        user.setPassword("password");

        assertThrows(ValidationException.class, () -> userService.createUser(user));
    }

    @Test
    public void createUserWithBlankPassword() {
        User user = new User();
        user.setUsername("username");
        user.setPassword("");

        assertThrows(ValidationException.class, () -> userService.createUser(user));
    }

}

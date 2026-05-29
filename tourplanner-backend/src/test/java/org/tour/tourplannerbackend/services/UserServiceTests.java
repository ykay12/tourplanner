package org.tour.tourplannerbackend.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.tour.tourplannerbackend.model.User;
import org.tour.tourplannerbackend.repository.UserRepository;
import org.tour.tourplannerbackend.service.UserService;

import static org.junit.jupiter.api.Assertions.assertEquals;
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
}

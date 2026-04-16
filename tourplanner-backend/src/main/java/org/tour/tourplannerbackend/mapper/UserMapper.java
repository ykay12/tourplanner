package org.tour.tourplannerbackend.mapper;

import org.tour.tourplannerbackend.dto.UserDto;
import org.tour.tourplannerbackend.model.User;

public final class UserMapper {

    private UserMapper() {
    }

    public static UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername());
    }
}


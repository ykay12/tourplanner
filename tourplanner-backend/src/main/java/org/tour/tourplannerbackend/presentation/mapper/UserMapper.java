package org.tour.tourplannerbackend.presentation.mapper;

import org.tour.tourplannerbackend.presentation.dto.frontend.UserDto;
import org.tour.tourplannerbackend.persistence.entity.User;

public final class UserMapper {

    private UserMapper() {
        throw new UnsupportedOperationException("Utility class");
    }


    public static UserDto toDto(User user) {
        if (user == null) {
            return null;
        }
        return new UserDto(user.getId(), user.getUsername());
    }
}


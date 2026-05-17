package org.tour.tourplannerbackend.mapper;

import org.tour.tourplannerbackend.dto.frontend.LogDto;
import org.tour.tourplannerbackend.model.Log;

public final class LogMapper {

    private LogMapper() {
    }

    public static LogDto toDto(Log log) {
        if (log == null) {
            return null;
        }
        LogDto dto = new LogDto();
        dto.setId(log.getId());
        dto.setCreatedAt(log.getCreatedAt());
        dto.setComment(log.getComment());
        dto.setDifficulty(log.getDifficulty());
        dto.setTotalDistance(log.getTotalDistance());
        dto.setTotalTime(log.getTotalTime());
        dto.setRating(log.getRating());
        return dto;
    }
}


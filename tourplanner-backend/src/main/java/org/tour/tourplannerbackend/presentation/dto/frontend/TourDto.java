package org.tour.tourplannerbackend.presentation.dto.frontend;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.tour.tourplannerbackend.persistence.entity.enums.TourType;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TourDto {
    private Long id;
    private String name;
    private String description;
    private TourType tourType;
}


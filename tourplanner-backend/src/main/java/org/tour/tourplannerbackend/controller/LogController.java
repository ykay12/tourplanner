package org.tour.tourplannerbackend.controller;

import org.springframework.web.bind.annotation.*;
import org.tour.tourplannerbackend.model.Log;
import org.tour.tourplannerbackend.service.LogService;

import java.util.List;

@RestController
@CrossOrigin // Erlaubt Requests vom Angular Dev Server:
@RequestMapping("/tours/{tourId}/logs")
public class LogController {

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @CrossOrigin
    @GetMapping
    public List<Log> getLogs(@PathVariable Long tourId) {
        return logService.getLogsForTour(tourId);
    }

    @CrossOrigin
    @PostMapping
    public Log createLog(@PathVariable Long tourId, @RequestBody Log log) {
        return logService.createOrUpdateLog(tourId, log);
    }

    @CrossOrigin
    @PutMapping("/{logId}")
    public Log updateLog(@PathVariable Long tourId, @PathVariable Long logId, @RequestBody Log log) {
        log.setId(logId);
        return logService.createOrUpdateLog(tourId, log);
    }

    @CrossOrigin
    @DeleteMapping("/{logId}")
    public void deleteLog(@PathVariable Long tourId, @PathVariable Long logId) {
        logService.deleteLog(tourId, logId);
    }
}


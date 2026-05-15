package org.tour.tourplannerbackend.controller;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
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

    @GetMapping
    public List<Log> getLogs(@PathVariable Long tourId, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        return logService.getLogsForTour(username, tourId);
    }
    @PostMapping
    public Log createLog(@PathVariable Long tourId, @RequestBody Log log, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        return logService.createOrUpdateLog(username, tourId, log);
    }

    @PutMapping("/{logId}")
    public Log updateLog(
            @PathVariable Long tourId,
            @PathVariable Long logId,
            @RequestBody Log log,
            HttpServletRequest request
    ) {
        String username = (String) request.getAttribute("username");
        log.setId(logId);
        return logService.createOrUpdateLog(username, tourId, log);
    }

    @DeleteMapping("/{logId}")
    public void deleteLog(@PathVariable Long tourId, @PathVariable Long logId,  HttpServletRequest request) {
        String username = request.getAttribute("username").toString();
        logService.deleteLog(username, tourId, logId);
    }
}


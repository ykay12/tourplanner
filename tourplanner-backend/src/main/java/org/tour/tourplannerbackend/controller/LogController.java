package org.tour.tourplannerbackend.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.tour.tourplannerbackend.model.Log;
import org.tour.tourplannerbackend.service.LogService;

import java.util.List;

@RestController
@CrossOrigin // Erlaubt Requests vom Angular Dev Server:
@RequestMapping("/tours/{tourId}/logs")
public class LogController {

    private static final Logger LOGGER = LogManager.getLogger(LogController.class);

    private final LogService logService;

    public LogController(LogService logService) {
        this.logService = logService;
    }

    @GetMapping
    public List<Log> getLogs(@PathVariable Long tourId, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        LOGGER.info("Request received to fetch logs. tourId={}, username={}", tourId, username);

        List<Log> logs = logService.getLogsForTour(username, tourId);
        LOGGER.info("Fetched {} logs. tourId={}, username={}", logs.size(), tourId, username);

        return logs;
    }

    @PostMapping
    public Log createLog(@PathVariable Long tourId, @RequestBody Log log, HttpServletRequest request) {
        String username = (String) request.getAttribute("username");
        LOGGER.info("Request received to create log. tourId={}, username={}", tourId, username);

        Log createdLog = logService.createOrUpdateLog(username, tourId, log);
        LOGGER.info("Created log successfully. logId={}, tourId={}, username={}", createdLog.getId(), tourId, username);

        return createdLog;
    }

    @PutMapping("/{logId}")
    public Log updateLog( //Frontend: backendFacadeService.editLog
            @PathVariable Long tourId,
            @PathVariable Long logId,
            @RequestBody Log log,
            HttpServletRequest request
    ) {
        String username = (String) request.getAttribute("username");
        LOGGER.info("Request received to update log. logId={}, tourId={}, username={}", logId, tourId, username);

        log.setId(logId);
        Log updatedLog = logService.createOrUpdateLog(username, tourId, log);
        LOGGER.info("Updated log successfully. logId={}, tourId={}, username={}", updatedLog.getId(), tourId, username);

        return updatedLog;
    }

    @DeleteMapping("/{logId}")
    public void deleteLog(@PathVariable Long tourId, @PathVariable Long logId, HttpServletRequest request) {
        String username = request.getAttribute("username").toString();
        LOGGER.info("Request received to delete log. logId={}, tourId={}, username={}", logId, tourId, username);

        logService.deleteLog(username, tourId, logId);
        LOGGER.info("Deleted log successfully. logId={}, tourId={}, username={}", logId, tourId, username);
    }
}
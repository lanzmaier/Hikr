package com.hikr.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/app")
public class AppInfoController {

    private final String applicationName;
    private final String version;

    public AppInfoController(
            @Value("${spring.application.name:hikr-app}") String applicationName,
            @Value("${app.version:0.0.1-SNAPSHOT}") String version) {
        this.applicationName = applicationName;
        this.version = version;
    }

    @GetMapping("/info")
    public Map<String, Object> info() {
        return Map.of(
                "name", applicationName,
                "version", version,
                "timestamp", Instant.now().toString(),
                "boundedContexts", List.of("tour-search", "tour-matching", "userprofile")
        );
    }
}

package com.hikr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class HikrApplication {

    public static void main(String[] args) {
        SpringApplication.run(HikrApplication.class, args);
    }
}

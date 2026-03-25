package com.hikr.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record RegisterRequest(
        @NotBlank(message = "username is required") String username,
        @NotBlank(message = "email is required") String email,
        @NotBlank(message = "password is required") String password,
        String firstName,
        String lastName
) {
}

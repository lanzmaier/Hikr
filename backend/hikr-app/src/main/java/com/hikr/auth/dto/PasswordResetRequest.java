package com.hikr.auth.dto;

import jakarta.validation.constraints.NotBlank;

public record PasswordResetRequest(
        @NotBlank(message = "usernameOrEmail is required") String usernameOrEmail
) {
}

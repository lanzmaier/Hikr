package com.hikr.auth;

import jakarta.validation.Valid;
import com.hikr.auth.dto.LogoutRequest;
import com.hikr.auth.dto.LoginRequest;
import com.hikr.auth.dto.PasswordResetRequest;
import com.hikr.auth.dto.RegisterRequest;
import com.hikr.auth.dto.KeycloakTokenResponse;
import com.hikr.auth.service.KeycloakAuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final KeycloakAuthService keycloakAuthService;

    public AuthController(KeycloakAuthService keycloakAuthService) {
        this.keycloakAuthService = keycloakAuthService;
    }

    @PostMapping("/login/user")
    public ResponseEntity<KeycloakTokenResponse> loginUser(@Valid @RequestBody LoginRequest request) {
        KeycloakTokenResponse tokenResponse = keycloakAuthService.loginUser(request);
        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/login/admin")
    public ResponseEntity<KeycloakTokenResponse> loginAdmin(@Valid @RequestBody LoginRequest request) {
        KeycloakTokenResponse tokenResponse = keycloakAuthService.loginAdmin(request);
        return ResponseEntity.ok(tokenResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@Valid @RequestBody RegisterRequest request) {
        String userId = keycloakAuthService.registerUser(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "User registered successfully", "userId", userId));
    }

    @PostMapping("/password-reset")
    public ResponseEntity<Map<String, String>> requestPasswordReset(@Valid @RequestBody PasswordResetRequest request) {
        keycloakAuthService.requestPasswordReset(request.usernameOrEmail());
        return ResponseEntity.ok(Map.of("message", "Password reset requested"));
    }

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@Valid @RequestBody LogoutRequest request) {
        keycloakAuthService.logout(request.refreshToken());
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleAuthError(IllegalArgumentException ex) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("error", "unauthorized", "message", ex.getMessage()));
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<Map<String, String>> handleServerError(IllegalStateException ex) {
        return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                .body(Map.of("error", "keycloak_error", "message", ex.getMessage()));
    }
}

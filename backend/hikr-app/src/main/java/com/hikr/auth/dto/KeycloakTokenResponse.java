package com.hikr.auth.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;

public record KeycloakTokenResponse(
        @JsonProperty("access_token") String accessToken,
        @JsonProperty("refresh_token") String refreshToken,
        @JsonProperty("token_type") String tokenType,
        @JsonProperty("expires_in") Long expiresIn
) {
    public static KeycloakTokenResponse fromMap(Map<String, Object> map) {
        return new KeycloakTokenResponse(
                (String) map.get("access_token"),
                (String) map.get("refresh_token"),
                (String) map.getOrDefault("token_type", "Bearer"),
                ((Number) map.getOrDefault("expires_in", 0L)).longValue()
        );
    }
}

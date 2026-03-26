package com.hikr.config;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.StringUtils;

@Configuration
public class KeycloakAdminConfig {

    @Bean
    public Keycloak keycloakAdminClient(
            @Value("${keycloak.admin.url}") String serverUrl,
            @Value("${keycloak.admin.login-realm:master}") String loginRealm,
            @Value("${keycloak.admin.client-id}") String clientId,
            @Value("${keycloak.admin.client-secret:}") String clientSecret,
            @Value("${keycloak.admin.username}") String username,
            @Value("${keycloak.admin.password}") String password,
            @Value("${keycloak.admin.grant-type:password}") String grantType) {
        KeycloakBuilder builder = KeycloakBuilder.builder()
                .serverUrl(serverUrl)
                .realm(loginRealm)
                .clientId(clientId)
                .grantType(grantType)
                .username(username)
                .password(password);

        if (StringUtils.hasText(clientSecret)) {
            builder.clientSecret(clientSecret);
        }

        return builder.build();
    }
}

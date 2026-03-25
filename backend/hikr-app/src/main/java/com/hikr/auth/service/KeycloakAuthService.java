package com.hikr.auth.service;

import com.hikr.auth.dto.KeycloakTokenResponse;
import com.hikr.auth.dto.LoginRequest;
import com.hikr.auth.dto.RegisterRequest;
import jakarta.ws.rs.core.Response;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.ClientRepresentation;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

@Service
public class KeycloakAuthService {

    private final RestTemplate restTemplate = new RestTemplate();

    private final String keycloakUrl;
    private final String appRealm;
    private final String appClientId;
    private final String appClientSecret;
    private final String adminClientId;
    private final String adminClientSecret;
    private final Set<String> requiredAdminRoles;
    private final Keycloak keycloakAdminClient;

    public KeycloakAuthService(
            @Value("${keycloak.admin.url}") String keycloakUrl,
            @Value("${keycloak.app.realm:hikr}") String appRealm,
            @Value("${keycloak.app.client-id}") String appClientId,
            @Value("${keycloak.app.client-secret}") String appClientSecret,
            @Value("${keycloak.admin.client-id}") String adminClientId,
            @Value("${keycloak.admin.client-secret}") String adminClientSecret,
            @Value("${keycloak.admin.required-roles:admin}") String requiredAdminRoles,
            Keycloak keycloakAdminClient) {
        this.keycloakUrl = keycloakUrl;
        this.appRealm = appRealm;
        this.appClientId = appClientId;
        this.appClientSecret = appClientSecret;
        this.adminClientId = adminClientId;
        this.adminClientSecret = adminClientSecret;
        this.requiredAdminRoles = parseRoles(requiredAdminRoles);
        this.keycloakAdminClient = keycloakAdminClient;
    }

    public KeycloakTokenResponse loginUser(LoginRequest request) {
        return loginWithClient(request, appClientId, appClientSecret);
    }

    public KeycloakTokenResponse loginAdmin(LoginRequest request) {
        KeycloakTokenResponse tokenResponse = loginWithClient(request, adminClientId, adminClientSecret, false);
        if (!hasRequiredAdminRole(request.username())) {
            throw new IllegalArgumentException("Login failed: admin role required");
        }
        return tokenResponse;
    }

    public String registerUser(RegisterRequest request) {
        String resolvedFirstName = resolveFirstName(request.firstName());
        String resolvedLastName = resolveLastName(request.lastName(), request.username());
        String resolvedEmail = resolveEmail(request.email(), request.username());

        UserRepresentation user = new UserRepresentation();
        user.setUsername(request.username());
        user.setEmail(resolvedEmail);
        user.setFirstName(resolvedFirstName);
        user.setLastName(resolvedLastName);
        user.setEnabled(true);
        user.setEmailVerified(true);
        user.setRequiredActions(List.of());

        CredentialRepresentation passwordCredential = new CredentialRepresentation();
        passwordCredential.setType(CredentialRepresentation.PASSWORD);
        passwordCredential.setTemporary(false);
        passwordCredential.setValue(request.password());
        user.setCredentials(List.of(passwordCredential));

        Response response = keycloakAdminClient.realm(appRealm).users().create(user);
        int status = response.getStatus();
        if (status == 201) {
            String userId = extractUserId(response.getLocation());
            response.close();
            return userId;
        }
        if (status == 409) {
            response.close();
            throw new IllegalArgumentException("Registration failed: username or email already exists");
        }
        response.close();
        throw new IllegalStateException("Registration failed in Keycloak with status: " + status);
    }

    private KeycloakTokenResponse loginWithClient(LoginRequest request, String clientId, String clientSecret) {
        return loginWithClient(request, clientId, clientSecret, true);
    }

    private KeycloakTokenResponse loginWithClient(LoginRequest request, String clientId, String clientSecret,
            boolean allowAutoProfileRepair) {
        String tokenEndpoint = String.format("%s/realms/%s/protocol/openid-connect/token", keycloakUrl, appRealm);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "password");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("username", request.username());
        body.add("password", request.password());

        HttpEntity<MultiValueMap<String, String>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    tokenEndpoint,
                    HttpMethod.POST,
                    entity,
                    new ParameterizedTypeReference<>() {
                    });
            Map<String, Object> payload = response.getBody();
            if (payload == null || payload.get("access_token") == null) {
                throw new IllegalStateException("Keycloak did not return an access token");
            }
            return KeycloakTokenResponse.fromMap(payload);
        } catch (HttpStatusCodeException ex) {
            if (allowAutoProfileRepair && isAccountNotFullySetUp(ex)) {
                repairUserProfileForPasswordGrant(request.username());
                return loginWithClient(request, clientId, clientSecret, false);
            }
            if (!allowAutoProfileRepair && isAccountNotFullySetUp(ex)) {
                throw new IllegalArgumentException("Login failed: password change required", ex);
            }
            throw new IllegalArgumentException("Login failed: invalid credentials or client configuration", ex);
        }
    }

    private boolean isAccountNotFullySetUp(HttpStatusCodeException ex) {
        String responseBody = ex.getResponseBodyAsString();
        return responseBody != null
                && responseBody.contains("invalid_grant")
                && responseBody.contains("Account is not fully set up");
    }

    private void repairUserProfileForPasswordGrant(String username) {
        List<UserRepresentation> users = keycloakAdminClient.realm(appRealm).users().searchByUsername(username, true);
        UserRepresentation matchedUser = users.stream()
                .filter(user -> user.getUsername() != null && user.getUsername().equalsIgnoreCase(username))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Login failed: user not found"));

        matchedUser.setFirstName(resolveFirstName(matchedUser.getFirstName()));
        matchedUser.setLastName(resolveLastName(matchedUser.getLastName(), matchedUser.getUsername()));
        matchedUser.setEmail(resolveEmail(matchedUser.getEmail(), matchedUser.getUsername()));
        matchedUser.setEnabled(true);
        matchedUser.setRequiredActions(List.of());

        keycloakAdminClient.realm(appRealm)
                .users()
                .get(matchedUser.getId())
                .update(matchedUser);
    }

    private String resolveFirstName(String firstName) {
        if (StringUtils.hasText(firstName)) {
            return firstName.trim();
        }
        return "User";
    }

    private String resolveLastName(String lastName, String username) {
        if (StringUtils.hasText(lastName)) {
            return lastName.trim();
        }
        if (StringUtils.hasText(username)) {
            return username.trim();
        }
        return "Account";
    }

    private String resolveEmail(String email, String username) {
        if (StringUtils.hasText(email)) {
            return email.trim();
        }
        return buildFallbackEmail(username);
    }

    private String buildFallbackEmail(String username) {
        String source = StringUtils.hasText(username) ? username.trim().toLowerCase() : "user";
        String localPart = source.replaceAll("[^a-z0-9._-]", ".");
        if (!StringUtils.hasText(localPart)) {
            localPart = "user";
        }
        return localPart + "@local.hikr";
    }

    private String extractUserId(URI location) {
        if (location == null) {
            return "unknown";
        }
        String path = location.getPath();
        if (path == null || path.isBlank()) {
            return "unknown";
        }
        int index = path.lastIndexOf('/');
        if (index < 0 || index == path.length() - 1) {
            return "unknown";
        }
        return path.substring(index + 1);
    }

    private boolean hasRequiredAdminRole(String username) {
        List<UserRepresentation> users = keycloakAdminClient.realm(appRealm).users().searchByUsername(username, true);
        UserRepresentation matchedUser = users.stream()
                .filter(user -> user.getUsername() != null && user.getUsername().equalsIgnoreCase(username))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Login failed: user not found"));

        Set<String> userRoles = new HashSet<>();

        // Realm Level Roles
        List<RoleRepresentation> effectiveRoles = keycloakAdminClient.realm(appRealm)
                .users()
                .get(matchedUser.getId())
                .roles()
                .realmLevel()
                .listEffective();
        for (RoleRepresentation role : effectiveRoles) {
            if (role.getName() != null) {
                userRoles.add(normalizeRoleName(role.getName()));
            }
        }

        // Client Level Roles
        List<ClientRepresentation> clients = keycloakAdminClient.realm(appRealm)
                .clients()
                .findAll();
        for (ClientRepresentation client : clients) {
            if (client.getId() == null) {
                continue;
            }
            List<RoleRepresentation> clientRoles = keycloakAdminClient.realm(appRealm)
                    .users()
                    .get(matchedUser.getId())
                    .roles()
                    .clientLevel(client.getId())
                    .listEffective();

            for (RoleRepresentation role : clientRoles) {
                if (role.getName() != null) {
                    userRoles.add(normalizeRoleName(role.getName()));
                }
            }
        }

        // Check if user has any of the required admin roles
        for (String requiredRole : requiredAdminRoles) {
            if (userRoles.contains(normalizeRoleName(requiredRole))) {
                return true;
            }
        }
        return false;
    }

    private String normalizeRoleName(String roleName) {
        String normalized = roleName.trim().toLowerCase(Locale.ROOT);
        if (normalized.startsWith("role_")) {
            return normalized.substring("role_".length());
        }
        return normalized;
    }

    private Set<String> parseRoles(String roles) {
        return Arrays.stream(roles.split(","))
                .map(String::trim)
                .filter(role -> !role.isBlank())
                .collect(java.util.stream.Collectors.toSet());
    }
}

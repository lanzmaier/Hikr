/**
 * Authentication Types
 *
 * Defines all DTOs and interfaces for authentication flows,
 * including login, registration, token handling, and user data.
 *
 * @author Team
 * @version 1.0
 */

/**
 * Login request payload
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response with tokens
 */
export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

/**
 * Token refresh request payload
 */
export interface RefreshTokenRequest {
  refreshToken: string;
}

/**
 * Token refresh response
 */
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
  expiresIn: number;
}

/**
 * Registration request payload
 */
export interface RegistrationRequest {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptedTerms: boolean;
}

/**
 * Registration response
 */
export interface RegistrationResponse {
  id: string;
  email: string;
  username: string;
  message: string;
}

/**
 * Allowed domains response
 */
export interface AllowedDomainsResponse {
  domains: string[];
}

/**
 * User profile information
 */
export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

/**
 * Authentication error response
 */
export interface AuthError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

/**
 * Auth state in context
 */
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
}

/**
 * Auth context value type
 */
export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegistrationRequest) => Promise<void>;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
  clearError: () => void;
}

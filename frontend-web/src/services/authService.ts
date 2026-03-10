/**
 * Authentication Service
 *
 * Handles all authentication-related API calls including login,
 * registration, token refresh, and domain validation.
 *
 * @author Team
 * @version 1.0
 * @see apiClient for HTTP client configuration
 */

import { apiClient, setAccessToken, setRefreshToken } from './apiClient';
import {
  LoginRequest,
  LoginResponse,
  RegistrationRequest,
  RegistrationResponse,
  RefreshTokenRequest,
  RefreshTokenResponse,
  AllowedDomainsResponse,
  User,
} from '../types/auth';

/**
 * User login with email and password
 * @param credentials - Email and password
 * @returns LoginResponse with tokens and user data
 */
export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  const { accessToken, refreshToken } = response.data;

  // Store tokens
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);

  return response.data;
};

/**
 * Refresh access token using refresh token
 * @param refreshToken - Valid refresh token
 * @returns RefreshTokenResponse with new access token
 */
export const refreshAccessToken = async (
  refreshToken: string
): Promise<RefreshTokenResponse> => {
  const request: RefreshTokenRequest = { refreshToken };
  const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', request);
  const { accessToken, refreshToken: newRefreshToken } = response.data;

  // Update tokens
  setAccessToken(accessToken);
  if (newRefreshToken) {
    setRefreshToken(newRefreshToken);
  }

  return response.data;
};

/**
 * Register a new user
 * @param data - Registration data
 * @returns RegistrationResponse with new user info
 */
export const registerUser = async (data: RegistrationRequest): Promise<RegistrationResponse> => {
  const response = await apiClient.post<RegistrationResponse>('/registration', data);
  return response.data;
};

/**
 * Get allowed email domains for registration
 * @returns AllowedDomainsResponse with list of allowed domains
 */
export const getAllowedDomains = async (): Promise<AllowedDomainsResponse> => {
  const response = await apiClient.get<AllowedDomainsResponse>('/auth/allowed-domains');
  return response.data;
};

/**
 * Get current authenticated user info
 * @returns User profile data
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/users/me');
  return response.data;
};

/**
 * Validate email domain against allowed domains
 * @param email - Email to validate
 * @param allowedDomains - List of allowed domains
 * @returns true if email domain is allowed, false otherwise
 */
export const isEmailDomainAllowed = (email: string, allowedDomains: string[]): boolean => {
  const [, domain] = email.split('@');
  return domain ? allowedDomains.includes(domain) : false;
};

/**
 * Validate email format
 * @param email - Email to validate
 * @returns true if email format is valid
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param password - Password to validate
 * @returns Validation result with score (0-100) and feedback
 */
export const validatePasswordStrength = (
  password: string
): { score: number; feedback: string[] } => {
  const feedback: string[] = [];
  let score = 0;

  if (!password) return { score, feedback: ['Password is required'] };

  // Length check
  if (password.length >= 8) score += 20;
  if (password.length < 8) feedback.push('Password must be at least 8 characters long');

  if (password.length >= 12) score += 10;

  // Uppercase check
  if (/[A-Z]/.test(password)) score += 20;
  else feedback.push('Password should contain at least one uppercase letter');

  // Lowercase check
  if (/[a-z]/.test(password)) score += 20;
  else feedback.push('Password should contain at least one lowercase letter');

  // Number check
  if (/[0-9]/.test(password)) score += 15;
  else feedback.push('Password should contain at least one number');

  // Special character check
  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score += 15;
  else feedback.push('Password should contain at least one special character');

  return { score: Math.min(score, 100), feedback };
};

export default {
  loginUser,
  refreshAccessToken,
  registerUser,
  getAllowedDomains,
  getCurrentUser,
  isEmailDomainAllowed,
  isValidEmail,
  validatePasswordStrength,
};

/**
 * API Client
 *
 * Configures Axios client with interceptors for authentication,
 * error handling, and automatic token refresh.
 *
 * @author Team
 * @version 1.0
 */

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
} from 'axios';
import { ApiError, ApiErrorResponse } from '../types/api';

const API_BASE_URL = (import.meta as any).env.VITE_API_URL || 'http://localhost:8080/api/v1';
const TOKEN_KEY = 'hikr_access_token';
const REFRESH_KEY = 'hikr_refresh_token';

/**
 * Create and configure the API client
 */
export const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  /**
   * Request interceptor: Add authorization header
   */
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  /**
   * Response interceptor: Handle errors and token refresh
   */
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Handle 401 Unauthorized - attempt token refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem(REFRESH_KEY);
          if (!refreshToken) {
            // No refresh token, clear auth and redirect to login
            clearAuthTokens();
            window.location.href = '/login';
            return Promise.reject(error);
          }

          const response = await axios.post<{ accessToken: string; refreshToken?: string }>(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken }
          );

          const { accessToken, refreshToken: newRefreshToken } = response.data;
          localStorage.setItem(TOKEN_KEY, accessToken);

          if (newRefreshToken) {
            localStorage.setItem(REFRESH_KEY, newRefreshToken);
          }

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return client(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear auth and redirect to login
          clearAuthTokens();
          window.location.href = '/login';
          return Promise.reject(refreshError);
        }
      }

      // Handle other errors
      return Promise.reject(handleApiError(error));
    }
  );

  return client;
};

/**
 * Global API client instance
 */
export const apiClient = createApiClient();

/**
 * Store access token
 */
export const setAccessToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Store refresh token
 */
export const setRefreshToken = (token: string): void => {
  localStorage.setItem(REFRESH_KEY, token);
};

/**
 * Retrieve access token
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Retrieve refresh token
 */
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_KEY);
};

/**
 * Clear all authentication tokens
 */
export const clearAuthTokens = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

/**
 * Transform Axios error into ApiError
 */
const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    const data = error.response.data as ApiErrorResponse;
    return new ApiError(
      data.code || 'UNKNOWN_ERROR',
      error.response.status,
      data.message || error.message,
      data.details
    );
  }

  if (error.request) {
    return new ApiError(
      'NETWORK_ERROR',
      0,
      'No response from server. Please check your connection.'
    );
  }

  return new ApiError(
    'REQUEST_ERROR',
    0,
    error.message || 'An unexpected error occurred'
  );
};

export default apiClient;

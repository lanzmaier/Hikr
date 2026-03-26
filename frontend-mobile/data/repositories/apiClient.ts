import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { ApiError, ApiErrorResponse } from '../models/api';

const DEFAULT_API_BASE_URL = 'http://192.168.31.194:8080/api/v1';
const API_BASE_URL =
  ((Constants.expoConfig?.extra as { apiUrl?: string } | undefined)?.apiUrl ?? DEFAULT_API_BASE_URL);
const TOKEN_KEY = 'hikr_access_token';
const REFRESH_KEY = 'hikr_refresh_token';

// In-memory cache for sync access in interceptors
let inMemoryAccessToken: string | null = null;
let inMemoryRefreshToken: string | null = null;

// Callback invoked when a token refresh fails (set by AuthContext)
let onAuthExpired: (() => void) | null = null;

export const setAuthExpiredCallback = (callback: () => void): void => {
  onAuthExpired = callback;
};

export const initTokensFromStorage = async (): Promise<void> => {
  try {
    const [access, refresh] = await AsyncStorage.multiGet([TOKEN_KEY, REFRESH_KEY]);
    inMemoryAccessToken = access[1];
    inMemoryRefreshToken = refresh[1];
  } catch {
    inMemoryAccessToken = null;
    inMemoryRefreshToken = null;
  }
};

export const setAccessToken = async (token: string): Promise<void> => {
  inMemoryAccessToken = token;
  await AsyncStorage.setItem(TOKEN_KEY, token);
};

export const setRefreshToken = async (token: string): Promise<void> => {
  inMemoryRefreshToken = token;
  await AsyncStorage.setItem(REFRESH_KEY, token);
};

export const getAccessToken = (): string | null => inMemoryAccessToken;

export const getRefreshToken = (): string | null => inMemoryRefreshToken;

export const clearAuthTokens = async (): Promise<void> => {
  inMemoryAccessToken = null;
  inMemoryRefreshToken = null;
  await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_KEY]);
};

const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
  });

  client.interceptors.request.use(
    (config) => {
      if (inMemoryAccessToken) {
        config.headers.Authorization = `Bearer ${inMemoryAccessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError & { config?: { _retry?: boolean } }) => {
      const originalRequest = error.config as (typeof error.config & { _retry?: boolean }) | undefined;

      if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true;

        const currentRefreshToken = inMemoryRefreshToken;
        if (!currentRefreshToken) {
          await clearAuthTokens();
          onAuthExpired?.();
          return Promise.reject(handleApiError(error));
        }

        try {
          const response = await axios.post<{ accessToken: string; refreshToken?: string }>(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken: currentRefreshToken }
          );
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          await setAccessToken(accessToken);
          if (newRefreshToken) await setRefreshToken(newRefreshToken);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return client(originalRequest);
        } catch {
          await clearAuthTokens();
          onAuthExpired?.();
          return Promise.reject(handleApiError(error));
        }
      }

      return Promise.reject(handleApiError(error));
    }
  );

  return client;
};

const handleApiError = (error: AxiosError): ApiError => {
  if (error.response) {
    const data = error.response.data as ApiErrorResponse;
    return new ApiError(
      data?.code || 'UNKNOWN_ERROR',
      error.response.status,
      data?.message || error.message,
      data?.details
    );
  }
  if (error.request) {
    return new ApiError('NETWORK_ERROR', 0, 'Keine Serverantwort. Bitte Verbindung prüfen.');
  }
  return new ApiError('REQUEST_ERROR', 0, error.message || 'Ein unerwarteter Fehler ist aufgetreten.');
};

export const apiClient = createApiClient();

export default apiClient;

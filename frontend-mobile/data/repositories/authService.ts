import { apiClient, setAccessToken, setRefreshToken } from './apiClient';
import {
  LoginRequest,
  LoginResponse,
  MobileRegistrationRequest,
  RegistrationResponse,
  RefreshTokenResponse,
  User,
} from '../models/auth';

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>('/auth/login', credentials);
  const { accessToken, refreshToken } = response.data;
  await setAccessToken(accessToken);
  await setRefreshToken(refreshToken);
  return response.data;
};

export const refreshAccessToken = async (refreshToken: string): Promise<RefreshTokenResponse> => {
  const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', { refreshToken });
  const { accessToken, refreshToken: newRefreshToken } = response.data;
  await setAccessToken(accessToken);
  if (newRefreshToken) await setRefreshToken(newRefreshToken);
  return response.data;
};

export const registerUser = async (data: MobileRegistrationRequest): Promise<RegistrationResponse> => {
  // Split name into firstName / lastName for the backend
  const nameParts = data.name.trim().split(/\s+/);
  const firstName = nameParts[0] ?? data.name;
  const lastName = nameParts.slice(1).join(' ') || firstName;

  const payload = {
    email: data.email,
    password: data.password,
    firstName,
    lastName,
    username: data.email.split('@')[0],
    acceptedTerms: true,
    preferredDifficulties: data.preferredDifficulties,
    preferredRegions: data.preferredRegions,
  };

  const response = await apiClient.post<RegistrationResponse>('/registration', payload);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await apiClient.get<User>('/users/me');
  return response.data;
};

export const sendPasswordResetLink = async (email: string): Promise<void> => {
  await apiClient.post('/auth/forgot-password', { email });
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePasswordStrength = (password: string): { score: number; feedback: string[] } => {
  const feedback: string[] = [];
  let score = 0;

  if (!password) return { score, feedback: ['Passwort ist erforderlich'] };

  if (password.length >= 8) score += 20;
  else feedback.push('Mindestens 8 Zeichen erforderlich');

  if (password.length >= 12) score += 10;

  if (/[A-Z]/.test(password)) score += 20;
  else feedback.push('Mindestens ein Großbuchstabe erforderlich');

  if (/[a-z]/.test(password)) score += 20;
  else feedback.push('Mindestens ein Kleinbuchstabe erforderlich');

  if (/[0-9]/.test(password)) score += 15;
  else feedback.push('Mindestens eine Zahl erforderlich');

  if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score += 15;
  else feedback.push('Mindestens ein Sonderzeichen empfohlen');

  return { score: Math.min(score, 100), feedback };
};

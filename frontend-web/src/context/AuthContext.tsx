/**
 * Authentication Context Provider
 *
 * Provides global authentication state and actions using React Context.
 * Handles login, registration, logout, token refresh, and error management.
 *
 * @author Team
 * @version 1.0
 * @see useAuth hook to access auth context in components
 */

import React, { createContext, useCallback, useEffect, useState } from 'react';
import { AuthContextType, AuthState, AuthError, RegistrationRequest } from '../types/auth';
import {
  loginUser,
  registerUser,
  getCurrentUser,
  refreshAccessToken,
} from '../services/authService';
import { getAccessToken, getRefreshToken, clearAuthTokens } from '../services/apiClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

/**
 * AuthProvider component - Wraps application with authentication context
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  /**
   * Initialize auth state from storage on mount
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (accessToken) {
          // Try to fetch current user
          const user = await getCurrentUser();
          setState((prev) => ({
            ...prev,
            user,
            accessToken,
            refreshToken,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          }));
        } else {
          // No token, clear state
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }));
        }
      } catch (error) {
        // Failed to restore session
        clearAuthTokens();
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: {
            code: 'SESSION_RESTORE_FAILED',
            message: 'Failed to restore session',
          },
        }));
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login action
   */
  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await loginUser({ email, password });
      setState((prev) => ({
        ...prev,
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const authError: AuthError = {
        code: 'LOGIN_FAILED',
        message: error instanceof Error ? error.message : 'Login failed',
      };

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: authError,
      }));

      throw error;
    }
  }, []);

  /**
   * Register action
   */
  const register = useCallback(async (data: RegistrationRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      await registerUser(data);
      // Registration successful, but user needs to login
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      const authError: AuthError = {
        code: 'REGISTRATION_FAILED',
        message: error instanceof Error ? error.message : 'Registration failed',
      };

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: authError,
      }));

      throw error;
    }
  }, []);

  /**
   * Logout action
   */
  const logout = useCallback(() => {
    clearAuthTokens();
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  /**
   * Refresh access token action
   */
  const refreshToken = useCallback(async () => {
    const currentRefreshToken = getRefreshToken();

    if (!currentRefreshToken) {
      logout();
      throw new Error('No refresh token available');
    }

    try {
      await refreshAccessToken(currentRefreshToken);
      // Token was successfully refreshed by the service
      setState((prev) => ({
        ...prev,
        error: null,
      }));
    } catch (error) {
      // Token refresh failed, logout user
      logout();
      throw error;
    }
  }, [logout]);

  /**
   * Clear error action
   */
  const clearError = useCallback(() => {
    setState((prev) => ({
      ...prev,
      error: null,
    }));
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshAccessToken: refreshToken,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

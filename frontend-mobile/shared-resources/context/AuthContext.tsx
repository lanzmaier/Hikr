import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthState, AuthError, MobileRegistrationRequest } from '../../data/models/auth';
import { loginUser, registerUser, getCurrentUser, refreshAccessToken } from '../../data/repositories/authService';
import {
  getAccessToken,
  getRefreshToken,
  clearAuthTokens,
  initTokensFromStorage,
  setAuthExpiredCallback,
} from '../../data/repositories/apiClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  const logout = useCallback(async () => {
    await clearAuthTokens();
    setState({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  }, []);

  // Register the logout callback for apiClient (handles expired refresh tokens)
  useEffect(() => {
    setAuthExpiredCallback(logout);
  }, [logout]);

  // Restore session from AsyncStorage on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await initTokensFromStorage();
        const accessToken = getAccessToken();
        const refreshToken = getRefreshToken();

        if (accessToken) {
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
          setState((prev) => ({ ...prev, isLoading: false }));
        }
      } catch {
        await clearAuthTokens();
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const response = await loginUser({ email, password });
      setState({
        user: response.user,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const authError: AuthError = {
        code: 'LOGIN_FAILED',
        message: error instanceof Error ? error.message : 'Anmeldung fehlgeschlagen.',
      };
      setState((prev) => ({ ...prev, isLoading: false, error: authError }));
      throw error;
    }
  }, []);

  const register = useCallback(async (data: MobileRegistrationRequest) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      await registerUser(data);
      setState((prev) => ({ ...prev, isLoading: false, error: null }));
    } catch (error) {
      const authError: AuthError = {
        code: 'REGISTRATION_FAILED',
        message: error instanceof Error ? error.message : 'Registrierung fehlgeschlagen.',
      };
      setState((prev) => ({ ...prev, isLoading: false, error: authError }));
      throw error;
    }
  }, []);

  const refreshToken = useCallback(async () => {
    const currentRefreshToken = getRefreshToken();
    if (!currentRefreshToken) {
      await logout();
      throw new Error('Kein Refresh-Token verfügbar.');
    }
    try {
      await refreshAccessToken(currentRefreshToken);
      setState((prev) => ({ ...prev, error: null }));
    } catch {
      await logout();
      throw new Error('Sitzung abgelaufen. Bitte erneut anmelden.');
    }
  }, [logout]);

  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
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

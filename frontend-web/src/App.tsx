/**
 * App Component
 *
 * Main application component with routing configuration.
 * Sets up routes for login, registration, and protected pages.
 *
 * @author Team
 * @version 1.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedGuard from './components/organisms/ProtectedGuard';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import AdminOverviewPage from './pages/AdminOverviewPage';
import AdminUsersPage from './pages/AdminUsersPage';

export const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedGuard>
                <AdminOverviewPage />
              </ProtectedGuard>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedGuard>
                <AdminUsersPage />
              </ProtectedGuard>
            }
          />

          {/* Redirect root to dashboard or login */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Not Found */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;

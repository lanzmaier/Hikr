/**
 * Registration Page
 *
 * Page component for user registration with form and navigation to login.
 *
 * @author Team
 * @version 1.0
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegistrationScreen from '../components/pages/RegistrationScreen';

export const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <RegistrationScreen />
  );
};

export default RegistrationPage;

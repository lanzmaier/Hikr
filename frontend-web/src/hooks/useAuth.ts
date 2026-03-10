import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { RegistrationRequest } from '../types/auth';
import { isValidEmail, validatePasswordStrength } from '../services/authService';

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const useLoginForm = () => {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateForm = useCallback((): ValidationResult => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  }, [formData]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [touched]);

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();
    setErrors(validation.errors);
    if (!validation.isValid) return;
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      // Error is handled by context
    }
  }, [formData, validateForm, login]);

  return {
    formData,
    errors,
    touched,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
    setFormData,
    setErrors,
  };
};

export const useRegistrationForm = () => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState<RegistrationRequest>({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    acceptedTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] as string[] });

  const validateForm = useCallback((): ValidationResult => {
    const newErrors: Record<string, string> = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (passwordStrength.score < 40) {
      newErrors.password = 'Password is not strong enough';
    }
    if (!formData.firstName) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.acceptedTerms) {
      newErrors.acceptedTerms = 'You must accept the terms and conditions';
    }
    return {
      isValid: Object.keys(newErrors).length === 0,
      errors: newErrors,
    };
  }, [formData, passwordStrength]);

  const handleChange = useCallback((field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'password' && typeof value === 'string') {
      setPasswordStrength(validatePasswordStrength(value));
    }
    if (touched[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [touched]);

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateForm();
    setErrors(validation.errors);
    if (!validation.isValid) return;
    try {
      await register(formData);
    } catch (error) {
      // Error is handled by context
    }
  }, [formData, validateForm, register]);

  return {
    formData,
    errors,
    touched,
    passwordStrength,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
    setFormData,
    setErrors,
  };
};

export const useRequireAuth = () => {
  const { isAuthenticated, isLoading } = useAuth();
  return {
    isAuthenticated,
    isLoading,
  };
};

export { validatePasswordStrength } from '../services/authService';

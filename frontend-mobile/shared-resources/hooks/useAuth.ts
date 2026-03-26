import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { MobileRegistrationRequest } from '../../data/models/auth';
import {
  isValidEmail,
  sendPasswordResetLink,
  validatePasswordStrength,
} from '../../data/repositories/authService';

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
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich';
    }
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  }, [formData]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [touched]);

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setTouched({ email: true, password: true });
    const validation = validateForm();
    setErrors(validation.errors);
    if (!validation.isValid) return;
    await login(formData.email, formData.password);
  }, [formData, validateForm, login]);

  return { formData, errors, touched, isLoading, handleChange, handleBlur, handleSubmit };
};

export const useRegistrationForm = () => {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState<MobileRegistrationRequest>({
    name: '',
    email: '',
    password: '',
    preferredDifficulties: ['Mittel'],
    preferredRegions: ['Alpen'],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] as string[] });

  const validateForm = useCallback((): ValidationResult => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Name ist erforderlich';
    }
    if (!formData.email) {
      newErrors.email = 'E-Mail ist erforderlich';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Ungültige E-Mail-Adresse';
    }
    if (!formData.password) {
      newErrors.password = 'Passwort ist erforderlich';
    } else if (passwordStrength.score < 40) {
      newErrors.password = 'Passwort ist zu schwach';
    }
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  }, [formData, passwordStrength]);

  const handleChange = useCallback((field: keyof MobileRegistrationRequest, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === 'password' && typeof value === 'string') {
      setPasswordStrength(validatePasswordStrength(value));
    }
    if (touched[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [touched]);

  const togglePreference = useCallback((field: 'preferredDifficulties' | 'preferredRegions', value: string) => {
    setFormData((prev) => {
      const current = prev[field];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: next };
    });
  }, []);

  const handleBlur = useCallback((field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }, []);

  const handleSubmit = useCallback(async () => {
    setTouched({ name: true, email: true, password: true });
    const validation = validateForm();
    setErrors(validation.errors);
    if (!validation.isValid) return;
    await register(formData);
  }, [formData, validateForm, register]);

  return {
    formData,
    errors,
    touched,
    passwordStrength,
    isLoading,
    handleChange,
    togglePreference,
    handleBlur,
    handleSubmit,
  };
};

export const useForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(async () => {
    setTouched(true);
    if (!email) {
      setError('E-Mail ist erforderlich');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Ungültige E-Mail-Adresse');
      return;
    }
    setError(undefined);
    setIsLoading(true);
    try {
      await sendPasswordResetLink(email);
      setIsSuccess(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Fehler beim Senden des Links.');
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  return { email, setEmail, error, touched, isLoading, isSuccess, handleSubmit };
};

export { validatePasswordStrength } from '../../data/repositories/authService';

import { Colors } from '../theme/colors';

export const getFieldError = (errors: Record<string, string>, field: string): string | undefined =>
  errors[field];

export const hasFieldError = (errors: Record<string, string>, field: string): boolean =>
  !!errors[field];

export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'Ein unerwarteter Fehler ist aufgetreten.';
};

export const extractValidationErrors = (error: unknown): Record<string, string> => {
  const errors: Record<string, string> = {};
  if (error && typeof error === 'object') {
    if ('details' in error && typeof error.details === 'object' && error.details !== null) {
      Object.entries(error.details as Record<string, unknown>).forEach(([key, value]) => {
        errors[key] = typeof value === 'string' ? value : String(value);
      });
    }
  }
  return errors;
};

export const sanitizeEmail = (email: string): string => email.toLowerCase().trim();

export const getPasswordStrengthColor = (score: number): string => {
  if (score < 40) return Colors.error;
  if (score < 60) return '#facc15';
  if (score < 80) return '#60a5fa';
  return Colors.primary;
};

export const getPasswordStrengthLabel = (score: number): string => {
  if (score < 40) return 'Schwach';
  if (score < 60) return 'Mittel';
  if (score < 80) return 'Gut';
  return 'Stark';
};

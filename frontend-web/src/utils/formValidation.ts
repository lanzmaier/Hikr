/**
 * Form Validation Utilities
 *
 * Helper functions for form validation, formatting, and error handling.
 *
 * @author Team
 * @version 1.0
 */

/**
 * Form field error display
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Get error message for a specific field
 */
export const getFieldError = (errors: Record<string, string>, field: string): string | undefined => {
  return errors[field];
};

/**
 * Check if a field has an error
 */
export const hasFieldError = (errors: Record<string, string>, field: string): boolean => {
  return !!errors[field];
};

/**
 * Format error messages for display
 */
export const formatErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return 'An unexpected error occurred';
};

/**
 * Extract validation errors from API response
 */
export const extractValidationErrors = (
  error: unknown
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (error && typeof error === 'object') {
    if ('details' in error && typeof error.details === 'object' && error.details !== null) {
      Object.entries(error.details).forEach(([key, value]) => {
        errors[key] = typeof value === 'string' ? value : String(value);
      });
    }
  }

  return errors;
};

/**
 * Sanitize email input
 */
export const sanitizeEmail = (email: string): string => {
  return email.toLowerCase().trim();
};

/**
 * Get password strength color
 */
export const getPasswordStrengthColor = (score: number): string => {
  if (score < 40) return 'bg-red-500';
  if (score < 60) return 'bg-yellow-500';
  if (score < 80) return 'bg-blue-500';
  return 'bg-green-500';
};

/**
 * Get password strength label
 */
export const getPasswordStrengthLabel = (score: number): string => {
  if (score < 40) return 'Weak';
  if (score < 60) return 'Fair';
  if (score < 80) return 'Good';
  return 'Strong';
};

import React from 'react';
import { formatErrorMessage } from '../../utils/formValidation';

interface AuthAlertProps {
  message?: string;
  variant?: 'danger' | 'soft-danger';
}

export const AuthAlert: React.FC<AuthAlertProps> = ({ message, variant = 'danger' }) => {
  if (!message) return null;

  const className =
    variant === 'soft-danger'
      ? 'p-4 bg-red-500/20 border border-red-500/50 rounded-xl'
      : 'p-4 bg-red-50 border border-red-200 rounded-md';

  const textClass = variant === 'soft-danger' ? 'text-sm text-red-200' : 'text-sm text-red-800';

  return (
    <div className={className}>
      <p className={textClass}>{formatErrorMessage(message)}</p>
    </div>
  );
};

export default AuthAlert;

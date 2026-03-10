import React, { useEffect, useState } from 'react';
import { useRegistrationForm } from '../hooks/useAuth';
import { useAuth } from '../context/AuthContext';
import {
  getFieldError,
  formatErrorMessage,
  getPasswordStrengthColor,
  getPasswordStrengthLabel,
} from '../utils/formValidation';
import { getAllowedDomains, isEmailDomainAllowed } from '../services/authService';

export const RegistrationForm: React.FC = () => {
  const { error: authError, clearError } = useAuth();
  const {
    formData,
    errors,
    touched,
    passwordStrength,
    isLoading,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegistrationForm();

  const [allowedDomains, setAllowedDomains] = useState<string[]>([]);
  const [domainsLoading, setDomainsLoading] = useState(true);
  const [emailDomainError, setEmailDomainError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await getAllowedDomains();
        setAllowedDomains(response.domains);
      } catch (error) {
        console.error('Failed to fetch allowed domains:', error);
      } finally {
        setDomainsLoading(false);
      }
    };
    fetchDomains();
  }, []);

  useEffect(() => {
    if (touched.email && formData.email) {
      if (allowedDomains.length > 0 && !isEmailDomainAllowed(formData.email, allowedDomains)) {
        setEmailDomainError(`Email domain not allowed. Allowed domains: ${allowedDomains.join(', ')}`);
      } else {
        setEmailDomainError(null);
      }
    }
  }, [formData.email, touched.email, allowedDomains]);

  useEffect(() => {
    if (authError) {
      clearError();
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {authError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{formatErrorMessage(authError.message)}</p>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
            First Name
          </label>
          <input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${getFieldError(errors, 'firstName') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            placeholder="John"
            disabled={isLoading}
            required
          />
          {touched.firstName && getFieldError(errors, 'firstName') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError(errors, 'firstName')}</p>
          )}
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
            Last Name
          </label>
          <input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${getFieldError(errors, 'lastName') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
            placeholder="Doe"
            disabled={isLoading}
            required
          />
          {touched.lastName && getFieldError(errors, 'lastName') && (
            <p className="mt-1 text-sm text-red-600">{getFieldError(errors, 'lastName')}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
          onBlur={() => handleBlur('username')}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${getFieldError(errors, 'username') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
          placeholder="johndoe"
          disabled={isLoading}
          required
        />
        {touched.username && getFieldError(errors, 'username') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError(errors, 'username')}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
          {!domainsLoading && <span className="text-gray-500 text-xs ml-2">({allowedDomains.join(', ')})</span>}
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${getFieldError(errors, 'email') || emailDomainError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
          placeholder="you@example.com"
          disabled={isLoading}
          required
        />
        {touched.email && (getFieldError(errors, 'email') || emailDomainError) && (
          <p className="mt-1 text-sm text-red-600">{getFieldError(errors, 'email') || emailDomainError}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${getFieldError(errors, 'password') ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
          placeholder="••••••••"
          disabled={isLoading}
          required
        />
        {formData.password && (
          <div className="mt-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="flex-grow bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all ${getPasswordStrengthColor(passwordStrength.score)}`}
                  style={{ width: `${passwordStrength.score}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-600">
                {getPasswordStrengthLabel(passwordStrength.score)}
              </span>
            </div>
            {passwordStrength.feedback.length > 0 && (
              <ul className="text-xs text-gray-600 list-disc list-inside">
                {passwordStrength.feedback.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        )}
        {touched.password && getFieldError(errors, 'password') && (
          <p className="mt-1 text-sm text-red-600">{getFieldError(errors, 'password')}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          id="acceptedTerms"
          type="checkbox"
          checked={formData.acceptedTerms}
          onChange={(e) => handleChange('acceptedTerms', e.target.checked)}
          onBlur={() => handleBlur('acceptedTerms')}
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          disabled={isLoading}
          required
        />
        <label htmlFor="acceptedTerms" className="ml-2 block text-sm text-gray-700">
          I accept the terms and conditions
        </label>
      </div>
      {touched.acceptedTerms && getFieldError(errors, 'acceptedTerms') && (
        <p className="text-sm text-red-600">{getFieldError(errors, 'acceptedTerms')}</p>
      )}

      <button
        type="submit"
        disabled={isLoading || domainsLoading || !!emailDomainError}
        className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Creating account...' : 'Register'}
      </button>
    </form>
  );
};

export default RegistrationForm;

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRegistrationForm } from '../../hooks/useAuth';
import { getAllowedDomains, isEmailDomainAllowed } from '../../services/authService';
import { getFieldError } from '../../utils/formValidation';
import ActionButton from '../atoms/ActionButton';
import TextInput from '../atoms/TextInput';
import AuthAlert from '../molecules/AuthAlert';
import FormField from '../molecules/FormField';
import PasswordStrengthMeter from '../molecules/PasswordStrengthMeter';

export const RegistrationPanel: React.FC = () => {
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
        setEmailDomainError(
          `Email domain not allowed. Allowed domains: ${allowedDomains.join(', ')}`
        );
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
      <AuthAlert message={authError?.message} />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="First Name"
          htmlFor="firstName"
          error={touched.firstName ? getFieldError(errors, 'firstName') : undefined}
        >
          <TextInput
            id="firstName"
            value={formData.firstName}
            onChange={(value) => handleChange('firstName', value)}
            onBlur={() => handleBlur('firstName')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
              getFieldError(errors, 'firstName') ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="John"
            disabled={isLoading}
            required
          />
        </FormField>

        <FormField
          label="Last Name"
          htmlFor="lastName"
          error={touched.lastName ? getFieldError(errors, 'lastName') : undefined}
        >
          <TextInput
            id="lastName"
            value={formData.lastName}
            onChange={(value) => handleChange('lastName', value)}
            onBlur={() => handleBlur('lastName')}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
              getFieldError(errors, 'lastName') ? 'border-red-500 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="Doe"
            disabled={isLoading}
            required
          />
        </FormField>
      </div>

      <FormField
        label="Username"
        htmlFor="username"
        error={touched.username ? getFieldError(errors, 'username') : undefined}
      >
        <TextInput
          id="username"
          value={formData.username}
          onChange={(value) => handleChange('username', value)}
          onBlur={() => handleBlur('username')}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
            getFieldError(errors, 'username') ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="johndoe"
          disabled={isLoading}
          required
        />
      </FormField>

      <FormField
        label={`Email Address${!domainsLoading ? ` (${allowedDomains.join(', ')})` : ''}`}
        htmlFor="email"
        error={
          touched.email ? getFieldError(errors, 'email') || emailDomainError || undefined : undefined
        }
      >
        <TextInput
          id="email"
          type="email"
          value={formData.email}
          onChange={(value) => handleChange('email', value)}
          onBlur={() => handleBlur('email')}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
            getFieldError(errors, 'email') || emailDomainError
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300'
          }`}
          placeholder="you@example.com"
          disabled={isLoading}
          required
          autoComplete="email"
        />
      </FormField>

      <FormField
        label="Password"
        htmlFor="password"
        error={touched.password ? getFieldError(errors, 'password') : undefined}
      >
        <TextInput
          id="password"
          type="password"
          value={formData.password}
          onChange={(value) => handleChange('password', value)}
          onBlur={() => handleBlur('password')}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary ${
            getFieldError(errors, 'password') ? 'border-red-500 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="........"
          disabled={isLoading}
          required
          autoComplete="new-password"
        />

        {formData.password && (
          <PasswordStrengthMeter
            score={passwordStrength.score}
            feedback={passwordStrength.feedback}
          />
        )}
      </FormField>

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

      <ActionButton
        type="submit"
        disabled={isLoading || domainsLoading || !!emailDomainError}
        className="w-full px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Creating account...' : 'Register'}
      </ActionButton>
    </form>
  );
};

export default RegistrationPanel;

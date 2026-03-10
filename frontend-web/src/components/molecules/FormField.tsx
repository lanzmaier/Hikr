import React from 'react';
import InlineError from '../atoms/InlineError';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  children: React.ReactNode;
  labelClassName?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  children,
  labelClassName,
}) => {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className={
          labelClassName ?? 'block text-sm font-medium text-gray-700 mb-1'
        }
      >
        {label}
      </label>
      {children}
      <InlineError message={error} className="mt-1 text-sm text-red-600" />
    </div>
  );
};

export default FormField;

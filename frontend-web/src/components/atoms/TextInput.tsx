import React from 'react';

interface TextInputProps {
  id: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  type = 'text',
  value,
  placeholder,
  disabled,
  required,
  autoComplete,
  className,
  onChange,
  onBlur,
}) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={onBlur}
      className={
        className ??
        'w-full h-14 px-4 bg-[rgba(13,26,13,0.5)] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[var(--color-moss)]/50 focus:border-[var(--color-moss)]/50 transition-all outline-none'
      }
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      autoComplete={autoComplete}
    />
  );
};

export default TextInput;

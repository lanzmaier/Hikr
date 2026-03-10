import React from 'react';
import TextInput from './TextInput';

interface PasswordInputProps {
  id: string;
  value: string;
  showPassword: boolean;
  disabled?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onToggleVisibility: () => void;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  value,
  showPassword,
  disabled,
  placeholder,
  autoComplete,
  className,
  onChange,
  onBlur,
  onToggleVisibility,
}) => {
  return (
    <div className="relative">
      <TextInput
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={className ?? 'w-full h-14 pl-4 pr-12 bg-[rgba(13,26,13,0.5)] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[var(--color-moss)]/50 focus:border-[var(--color-moss)]/50 transition-all outline-none'}
        placeholder={placeholder}
        disabled={disabled}
        required
        autoComplete={autoComplete}
      />

      <button
        onClick={onToggleVisibility}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[var(--color-moss)] transition-colors"
        type="button"
        tabIndex={-1}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        <span className="material-symbols-outlined text-xl">
          {showPassword ? 'visibility_off' : 'visibility'}
        </span>
      </button>
    </div>
  );
};

export default PasswordInput;

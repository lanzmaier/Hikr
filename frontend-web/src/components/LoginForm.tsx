import React, { useState } from 'react';
import { useLoginForm } from '../hooks/useAuth';
import { useAuth } from '../context/AuthContext';
import { getFieldError, formatErrorMessage } from '../utils/formValidation';

export const LoginForm: React.FC = () => {
  const { error: authError, clearError } = useAuth();
  const { formData, errors, touched, isLoading, handleChange, handleBlur, handleSubmit } = useLoginForm();
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    if (authError) {
      clearError();
    }
  }, []);

  return (
    <div className="glass-panel w-full rounded-3xl p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        <div className="mb-8">
          <h2 className="text-white text-xl font-semibold">Authorized Access</h2>
          <p className="text-slate-400 text-sm mt-1">Please enter your admin credentials</p>
        </div>

        {authError && (
          <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
            <p className="text-sm text-red-200">{formatErrorMessage(authError.message)}</p>
          </div>
        )}

        <div>
          <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 px-1">
            Admin Email
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">admin_panel_settings</span>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              className="w-full h-14 pl-12 pr-4 bg-[rgba(13,26,13,0.5)] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[var(--color-moss)]/50 focus:border-[var(--color-moss)]/50 transition-all outline-none"
              placeholder="admin@hikr.com"
              disabled={isLoading}
              required
              autoComplete="email"
            />
          </div>
          {touched.email && getFieldError(errors, 'email') && (
            <p className="mt-2 text-xs text-red-300 px-1">{getFieldError(errors, 'email')}</p>
          )}
        </div>

        <div>
          <label className="block text-slate-300 text-xs font-bold uppercase tracking-wider mb-2 px-1">
            Password
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-xl">lock</span>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              className="w-full h-14 pl-12 pr-12 bg-[rgba(13,26,13,0.5)] border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:ring-2 focus:ring-[var(--color-moss)]/50 focus:border-[var(--color-moss)]/50 transition-all outline-none"
              placeholder="••••••••"
              disabled={isLoading}
              required
              autoComplete="current-password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
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
          {touched.password && getFieldError(errors, 'password') && (
            <p className="mt-2 text-xs text-red-300 px-1">{getFieldError(errors, 'password')}</p>
          )}
        </div>

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded bg-[rgba(13,26,13,0.5)] border border-white/10 text-[var(--color-moss)] focus:ring-[var(--color-moss)] focus:ring-offset-0"
              disabled={isLoading}
            />
            <span className="text-xs text-slate-400 group-hover:text-slate-200 transition-colors">
              Keep session active
            </span>
          </label>
          <a href="#" className="text-xs text-[var(--color-moss)] hover:text-[var(--color-moss-bright)] font-semibold transition-colors">
            Recovery
          </a>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 bg-[#0d1a0d] border border-white/5 hover:bg-[#1b2e1b] disabled:bg-slate-700/50 disabled:cursor-not-allowed text-[var(--color-moss-bright)] font-bold text-base rounded-xl shadow-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
        >
          <span>{isLoading ? 'Signing in...' : 'Admin Login'}</span>
          <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </button>
      </form>
    </div>
  );
};

export default LoginForm;

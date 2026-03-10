import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

interface LocationState {
  from?: {
    pathname: string;
  };
}

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const state = location.state as LocationState | null;
  const from = state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#0d1a0d]">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a0d]/60 via-[#0d1a0d]/40 to-[#0d1a0d]/90 z-10"></div>
        <img
          alt="Forest background"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80"
        />
      </div>

      <div className="relative z-20 w-full max-w-[400px] flex flex-col items-center">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-moss)]/20 border border-[var(--color-moss)]/30 mb-4 shadow-xl">
            <span className="material-symbols-outlined text-[var(--color-moss-bright)] text-4xl">landscape</span>
          </div>
          <h1 className="text-white text-3xl font-extrabold tracking-tight">
            hikr{' '}
            <span className="text-[var(--color-moss-bright)] font-medium uppercase text-sm tracking-widest block mt-1">
              Admin Portal
            </span>
          </h1>
        </div>

        <LoginForm />

        <div className="mt-8 flex flex-col items-center gap-4">
          <p className="text-slate-500 text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">shield</span>
            Secure Environment
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white text-[10px] uppercase tracking-widest font-bold">
              System Status
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-[10px] uppercase tracking-widest font-bold">
              Privacy
            </a>
            <a href="#" className="text-slate-400 hover:text-white text-[10px] uppercase tracking-widest font-bold">
              Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

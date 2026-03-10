import React from 'react';
import LoginPanel from '../organisms/LoginPanel';
import AuthBackgroundTemplate from '../templates/AuthBackgroundTemplate';

export const LoginScreen: React.FC = () => {
  return (
    <AuthBackgroundTemplate
      title="hikr"
      badgeLabel="Admin Portal"
      subtitle="Secure platform access"
      footer={
        <>
          <p className="text-slate-500 text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">shield</span>
            Secure Environment
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-slate-400 hover:text-white text-[10px] uppercase tracking-widest font-bold"
            >
              System Status
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white text-[10px] uppercase tracking-widest font-bold"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white text-[10px] uppercase tracking-widest font-bold"
            >
              Support
            </a>
          </div>
        </>
      }
    >
      <LoginPanel />
    </AuthBackgroundTemplate>
  );
};

export default LoginScreen;

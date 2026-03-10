import React from 'react';

interface AuthBackgroundTemplateProps {
  title: string;
  subtitle: string;
  badgeLabel?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
}

export const AuthBackgroundTemplate: React.FC<AuthBackgroundTemplateProps> = ({
  title,
  subtitle,
  badgeLabel,
  footer,
  children,
}) => {
  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 bg-[#0d1a0d]">
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d1a0d]/60 via-[#0d1a0d]/40 to-[#0d1a0d]/90 z-10" />
        <img
          alt="Forest background"
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1800&q=80"
        />
      </div>

      <div className="relative z-20 w-full max-w-[400px] flex flex-col items-center">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-moss)]/20 border border-[var(--color-moss)]/30 mb-4 shadow-xl">
            <span className="material-symbols-outlined text-[var(--color-moss-bright)] text-4xl">
              landscape
            </span>
          </div>
          <h1 className="text-white text-3xl font-extrabold tracking-tight">
            {title}
            {badgeLabel && (
              <span className="text-[var(--color-moss-bright)] font-medium uppercase text-sm tracking-widest block mt-1">
                {badgeLabel}
              </span>
            )}
          </h1>
          <p className="text-slate-400 text-sm mt-2">{subtitle}</p>
        </div>

        {children}

        {footer && <div className="mt-8 flex flex-col items-center gap-4">{footer}</div>}
      </div>
    </div>
  );
};

export default AuthBackgroundTemplate;

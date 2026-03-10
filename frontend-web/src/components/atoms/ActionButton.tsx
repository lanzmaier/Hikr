import React from 'react';

interface ActionButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  type = 'button',
  disabled = false,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={
        className ??
        'w-full h-14 bg-[#0d1a0d] border border-white/5 hover:bg-[#1b2e1b] disabled:bg-slate-700/50 disabled:cursor-not-allowed text-[var(--color-moss-bright)] font-bold text-base rounded-xl shadow-lg transition-all active:scale-[0.98]'
      }
    >
      {children}
    </button>
  );
};

export default ActionButton;

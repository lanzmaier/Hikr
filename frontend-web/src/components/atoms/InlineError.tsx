import React from 'react';

interface InlineErrorProps {
  message?: string;
  className?: string;
}

export const InlineError: React.FC<InlineErrorProps> = ({ message, className }) => {
  if (!message) return null;
  return <p className={className ?? 'mt-2 text-xs text-red-300 px-1'}>{message}</p>;
};

export default InlineError;

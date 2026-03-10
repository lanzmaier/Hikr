import React from 'react';

interface SpinnerProps {
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return <div className={className ?? 'animate-spin rounded-full h-12 w-12 border-b-2 border-primary'} />;
};

export default Spinner;

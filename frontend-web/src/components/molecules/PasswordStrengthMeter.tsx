import React from 'react';
import {
  getPasswordStrengthColor,
  getPasswordStrengthLabel,
} from '../../utils/formValidation';

interface PasswordStrengthMeterProps {
  score: number;
  feedback: string[];
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  score,
  feedback,
}) => {
  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-grow bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className={`h-full transition-all ${getPasswordStrengthColor(score)}`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-600">
          {getPasswordStrengthLabel(score)}
        </span>
      </div>

      {feedback.length > 0 && (
        <ul className="text-xs text-gray-600 list-disc list-inside">
          {feedback.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PasswordStrengthMeter;

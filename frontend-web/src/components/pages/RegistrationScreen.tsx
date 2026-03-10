import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegistrationPanel from '../organisms/RegistrationPanel';

export const RegistrationScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h1 className="text-center text-3xl font-extrabold text-gray-900">Hikr</h1>
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="font-medium text-primary hover:text-primary-dark"
            >
              Sign in
            </button>
          </p>
        </div>

        <div className="bg-white py-12 px-4 shadow-md rounded-lg sm:px-10">
          <RegistrationPanel />
        </div>

        <div className="text-center text-xs text-gray-600">
          <p>By registering, you agree to our Terms of Service and Privacy Policy</p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationScreen;

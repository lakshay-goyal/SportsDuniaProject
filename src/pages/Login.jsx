import React from 'react';
import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <SignIn
        routing="path"
        path="/login"
        signUpUrl="/signup"
        afterSignInUrl="/dashboard"
        redirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-white shadow-md rounded-lg p-8',
            socialButtonsIconButton: 'border border-gray-300 hover:border-gray-400',
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
          },
        }}
      />
    </div>
  );
}

export default Login;
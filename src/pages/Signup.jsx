import React from 'react';
import { SignUp } from '@clerk/clerk-react';

function Signup() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <SignUp routing="path" path="/signup" signInUrl="/login" afterSignUpUrl="/dashboard" />
    </div>
  );
}

export default Signup;
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to News Payout System</h1>
        <p className="text-xl text-gray-600 mb-8">
          Manage your content and payouts efficiently with our comprehensive dashboard.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
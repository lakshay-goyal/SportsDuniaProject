import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import { Home, DollarSign, FileText, LayoutDashboard } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const { openSignIn, openSignUp } = useClerk();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-600 text-white' : '';
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-indigo-600 text-xl font-bold">
              YourBrand
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="flex items-center justify-center flex-1">
            {isSignedIn ? (
              <div className="flex space-x-4">
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors ${isActive('/dashboard')}`}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/news"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors ${isActive('/news')}`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  News
                </Link>
                <Link
                  to="/payout"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors ${isActive('/payout')}`}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Payout
                </Link>
              </div>
            ) : (
              <Link
                to="/"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors ${isActive('/')}`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            )}
          </div>

          {/* Right Section - Auth Buttons or User Menu */}
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }}
              />
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openSignIn()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openSignUp()}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
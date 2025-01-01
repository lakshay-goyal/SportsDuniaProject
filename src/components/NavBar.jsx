// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
// import { Home, DollarSign, FileText, LayoutDashboard, Moon, Sun } from 'lucide-react';

// const NavBar = () => {
//   const location = useLocation();
//   const { isSignedIn, user } = useUser();
//   const { openSignIn, openSignUp } = useClerk();
//   const [darkMode, setDarkMode] = useState(true);

//   useEffect(() => {
//     document.documentElement.classList.add('dark');
//   }, []);

//   const isActive = (path) => {
//     return location.pathname === path ? 'bg-indigo-600 text-white' : '';
//   };

//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//     document.documentElement.classList.toggle('dark');
//   };

//   return (
//     <nav className="bg-white shadow-lg dark:bg-gray-800">
//       <div className="container mx-auto px-4">
//         <div className="flex justify-between h-16">
//           {/* Logo Section */}
//           <div className="flex-shrink-0 flex items-center">
//             <Link to="/" className="text-indigo-600 text-xl font-bold dark:text-indigo-400">
//               Sports Duniya
//             </Link>
//           </div>

//           {/* Center Navigation */}
//           <div className="flex items-center justify-center flex-1">
//             {isSignedIn ? (
//               <div className="flex space-x-4">
//                 <Link
//                   to="/dashboard"
//                   className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors ${isActive('/dashboard')}`}
//                 >
//                   <LayoutDashboard className="w-4 h-4 mr-2" />
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/news"
//                   className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors ${isActive('/news')}`}
//                 >
//                   <FileText className="w-4 h-4 mr-2" />
//                   News
//                 </Link>
//                 <Link
//                   to="/payout"
//                   className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors ${isActive('/payout')}`}
//                 >
//                   <DollarSign className="w-4 h-4 mr-2" />
//                   Payout
//                 </Link>
//               </div>
//             ) : (
//               <Link
//                 to="/"
//                 className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors ${isActive('/')}`}
//               >
//                 <Home className="w-4 h-4 mr-2" />
//                 Home
//               </Link>
//             )}
//           </div>

//           {/* Right Section - Dark Mode Toggle and Auth Buttons or User Menu */}
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={toggleDarkMode}
//               className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
//               aria-label="Toggle Dark Mode"
//             >
//               {darkMode ? (
//                 <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
//               ) : (
//                 <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
//               )}
//             </button>
//             {isSignedIn ? (
//               <UserButton 
//                 afterSignOutUrl="/"
//                 appearance={{
//                   elements: {
//                     avatarBox: "w-8 h-8"
//                   }
//                 }}
//               />
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => openSignIn()}
//                   className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors"
//                 >
//                   Sign In
//                 </button>
//                 <button
//                   onClick={() => openSignUp()}
//                   className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md transition-colors"
//                 >
//                   Sign Up
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser, useClerk, UserButton } from '@clerk/clerk-react';
import { Home, DollarSign, FileText, LayoutDashboard, Moon, Sun, Menu, X } from 'lucide-react';

const NavBar = () => {
  const location = useLocation();
  const { isSignedIn } = useUser();
  const { openSignIn, openSignUp } = useClerk();
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-600 text-white' : '';
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-lg dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-indigo-600 text-xl font-bold dark:text-indigo-400">
              Sports Duniya
            </Link>
          </div>

          {/* Hamburger Menu (for small screens) */}
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } md:flex items-center justify-center flex-1 md:space-x-4 sm:block`}
          >
            {isSignedIn ? (
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors ${isActive('/dashboard')}`}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link
                  to="/news"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors ${isActive('/news')}`}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  News
                </Link>
                <Link
                  to="/payout"
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors ${isActive('/payout')}`}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Payout
                </Link>
              </div>
            ) : (
              <Link
                to="/"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors ${isActive('/')}`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </Link>
            )}
          </div>

          {/* Right Section - Dark Mode Toggle and Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                  },
                }}
              />
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => openSignIn()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openSignUp()}
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-md transition-colors"
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

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Ship, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, signOut, signInWithGoogle } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  console.log('Current user state:', user);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/jobs', label: 'Jobs' },
    { path: '/learning', label: 'Learning' },
    { path: '/community', label: 'Community' },
    { path: '/bike-sharing', label: 'Bike Sharing' },
    { path: '/news', label: 'News' },
    { path: '/content', label: 'Content' },
    { path: '/todo', label: 'Todo' },
  ];

  return (
    <nav className="bg-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Ship className="h-8 w-8" />
            <span className="font-bold text-xl">SeaGro</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 relative">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="hover:text-teal-200 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  className="hover:text-teal-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  Hello, {user.displayName}
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded">

                    <button
                      onClick={signOut}
                      className="block w-full text-left px-4 py-2 hover:bg-teal-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
              to="/signup"
              className="bg-teal-700 px-4 py-2 rounded hover:bg-teal-800"
            >
              Sign In / Sign Up
            </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleMenu} className="md:hidden">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block py-2 hover:text-teal-200"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <>
                <div className="block py-2 hover:text-teal-200">
                  Hello, {user.displayName}
                </div>
                <Link
                  to="/profile"
                  className="block py-2 hover:text-teal-200 pl-4"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-teal-200 pl-4"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  signInWithGoogle();
                  setIsOpen(false);
                }}
                className="block py-2 hover:text-teal-200"
              >
                Sign In with Google
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
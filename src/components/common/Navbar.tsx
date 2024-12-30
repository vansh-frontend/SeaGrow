// src/components/common/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Ship, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

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
            {/* <img src="img/Seagro1.png" alt="" className='h-10 w-10' /> */}
            <span className="font-bold text-xl">SeaGro</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
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
              <>
                <Link to="/profile" className="hover:text-teal-200">Profile</Link>
                <button
                  onClick={signOut}
                  className="bg-teal-700 px-4 py-2 rounded hover:bg-teal-800"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signup"
                className="bg-teal-700 px-4 py-2 rounded hover:bg-teal-800"
              >
                Sign In
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
                <Link
                  to="/profile"
                  className="block py-2 hover:text-teal-200"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:text-teal-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/signup"
                className="block py-2 hover:text-teal-200"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
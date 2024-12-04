import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'text-green-600' : 'text-gray-600';
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="https://i.imgur.com/4vkOF6D.png" 
                alt="EcoSense Logo"
                className="h-10 w-10 object-contain"
                loading="eager"
                srcSet="https://i.imgur.com/4vkOF6D.png 1x, https://i.imgur.com/4vkOF6D.png 2x"
              />
              <span className="text-xl font-bold text-gray-900">EcoSense</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className={`hover:text-green-700 transition-colors ${isActive('/about')}`}>
              About
            </Link>
            <Link to="/features" className={`hover:text-green-700 transition-colors ${isActive('/features')}`}>
              Features
            </Link>
            <Link to="/team" className={`hover:text-green-700 transition-colors ${isActive('/team')}`}>
              Our Team
            </Link>
            <Link 
              to="/login" 
              className={`hover:text-green-700 transition-colors ${isActive('/login')}`}
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            <Link 
              to="/about" 
              className="block px-3 py-2 hover:text-green-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/features" 
              className="block px-3 py-2 hover:text-green-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/team" 
              className="block px-3 py-2 hover:text-green-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Our Team
            </Link>
            <Link 
              to="/login" 
              className="block px-3 py-2 text-green-600 hover:text-green-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link 
              to="/signup"
              className="block px-3 py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
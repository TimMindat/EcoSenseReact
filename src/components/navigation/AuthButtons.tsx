import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { NavLink } from './NavLink';
import { User } from 'lucide-react';

export function AuthButtons() {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <NavLink to="/profile" className="flex items-center space-x-2">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt="Profile" 
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <User className="w-5 h-5" />
          )}
          <span>{user.displayName || 'Profile'}</span>
        </NavLink>
        <button
          onClick={() => logout()}
          className="text-gray-600 hover:text-green-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      <NavLink to="/login">
        Login
      </NavLink>
      <NavLink 
        to="/signup"
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
      >
        Sign Up
      </NavLink>
    </div>
  );
}
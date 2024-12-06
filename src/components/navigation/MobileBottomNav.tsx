import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from 'react-router-dom';
import { MobileNavLink } from './MobileNavLink';
import { Home, User, LogIn, UserPlus } from 'lucide-react';

export function MobileBottomNav() {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex items-center justify-around h-16">
        <MobileNavLink 
          to="/" 
          icon={Home}
          label="Home"
          isActive={location.pathname === '/'}
        />
        
        {user ? (
          <MobileNavLink 
            to="/profile" 
            icon={User}
            label="Profile"
            isActive={location.pathname === '/profile'}
          />
        ) : (
          <>
            <MobileNavLink 
              to="/login" 
              icon={LogIn}
              label="Login"
              isActive={location.pathname === '/login'}
            />
            <MobileNavLink 
              to="/signup" 
              icon={UserPlus}
              label="Sign Up"
              isActive={location.pathname === '/signup'}
            />
          </>
        )}
      </div>
    </nav>
  );
}
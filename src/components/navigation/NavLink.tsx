import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

export function NavLink({ to, children, className = '' }: NavLinkProps) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  const baseClasses = 'transition-colors duration-200';
  const activeClasses = isActive ? 'text-green-600' : 'text-gray-600 hover:text-green-700';
  
  return (
    <Link 
      to={to} 
      className={`${baseClasses} ${activeClasses} ${className}`}
    >
      {children}
    </Link>
  );
}
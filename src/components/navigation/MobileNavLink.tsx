import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface MobileNavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

export function MobileNavLink({ to, icon: Icon, label, isActive }: MobileNavLinkProps) {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
        isActive 
          ? 'text-green-600' 
          : 'text-gray-600 hover:text-green-600'
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
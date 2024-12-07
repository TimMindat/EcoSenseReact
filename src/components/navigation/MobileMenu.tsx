import React from 'react';
import { NavLink } from './NavLink';
import { AuthButtons } from './AuthButtons';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 bg-white">
      <div className="p-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
        >
          <X className="h-6 w-6" />
        </button>
        
        <div className="mt-8 space-y-4">
          <NavLink to="/air-quality" className="block px-3 py-2">
            Air Quality
          </NavLink>
          <NavLink to="/about" className="block px-3 py-2">
            About
          </NavLink>
          <NavLink to="/features" className="block px-3 py-2">
            Features
          </NavLink>
          <NavLink to="/team" className="block px-3 py-2">
            Our Team
          </NavLink>
          <div className="pt-4 border-t">
            <AuthButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
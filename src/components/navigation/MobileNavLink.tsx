import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavLinkProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
}

export function MobileNavLink({ to, icon: Icon, label, isActive }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors duration-200 ${
        isActive 
          ? 'text-green-600' 
          : 'text-gray-600 hover:text-green-600'
      }`}
    >
      <motion.div
        initial={{ scale: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Icon className="h-5 w-5" />
      </motion.div>
      <span className="text-xs font-medium">{label}</span>
    </Link>
  );
}
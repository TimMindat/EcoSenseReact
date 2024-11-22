import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Link({ href, children, className = '', onClick }: LinkProps) {
  const baseClasses = 'transition-colors duration-200';
  const defaultClasses = 'text-gray-600 hover:text-gray-900';
  const combinedClasses = `${baseClasses} ${!className.includes('bg-') ? defaultClasses : ''} ${className}`;

  // If the href starts with http or https, use a regular anchor tag
  if (href.startsWith('http')) {
    return (
      <a
        href={href}
        className={combinedClasses}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  // Otherwise, use React Router's Link component
  return (
    <RouterLink to={href} className={combinedClasses} onClick={onClick}>
      {children}
    </RouterLink>
  );
}
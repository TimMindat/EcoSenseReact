import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function Link({ href, children, className = '', ...props }: LinkProps) {
  const baseClasses = 'transition-colors duration-200';
  const defaultClasses = 'text-gray-600 hover:text-gray-900';
  
  return (
    <a
      href={href}
      className={`${baseClasses} ${!className.includes('bg-') ? defaultClasses : ''} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
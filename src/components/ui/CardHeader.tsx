import React from 'react';
import { MapPin } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface CardHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  location: string;
}

export function CardHeader({ title, subtitle, icon: Icon, location }: CardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Icon className="h-8 w-8 text-blue-600" />
        <div>
          <h3 className="text-xl font-bold">{title}</h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {location}
          </div>
        </div>
      </div>
      <a
        href="https://openweathermap.org/current"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
      >
        Data Source
      </a>
    </div>
  );
}
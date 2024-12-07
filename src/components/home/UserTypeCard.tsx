import React from 'react';
import { LucideIcon } from 'lucide-react';

interface UserTypeCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
}

export function UserTypeCard({ icon: Icon, title, description, features }: UserTypeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-transform duration-300">
      <div className="flex items-center space-x-3 mb-4">
        <Icon className="h-8 w-8 text-green-600" />
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <div className="mt-1">
              <div className="h-2 w-2 rounded-full bg-green-500" />
            </div>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
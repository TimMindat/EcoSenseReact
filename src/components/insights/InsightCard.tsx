import React from 'react';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface InsightCardProps {
  icon: LucideIcon;
  title: string;
  recommendation: string;
  color: string;
}

export function InsightCard({ icon: Icon, title, recommendation, color }: InsightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-100 p-4 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-3">
        <Icon className={`h-6 w-6 ${color} flex-shrink-0`} />
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{recommendation}</p>
        </div>
      </div>
    </motion.div>
  );
}
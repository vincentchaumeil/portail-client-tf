
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className }) => {
  return (
    <div className={cn("w-full bg-gray-100 rounded-full h-2.5 overflow-hidden shadow-inner", className)}>
      <div 
        className="h-2.5 rounded-full bg-gradient-to-r from-primary to-primary-dark transition-all duration-700 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;

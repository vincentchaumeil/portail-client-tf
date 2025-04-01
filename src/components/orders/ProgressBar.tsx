
import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  percentage: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, className }) => {
  return (
    <div className={cn("w-full bg-gray-200 rounded-full h-2.5", className)}>
      <div 
        className="h-2.5 rounded-full bg-primary-dark transition-all duration-700 ease-in-out"
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

export default ProgressBar;

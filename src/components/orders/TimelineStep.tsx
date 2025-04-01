
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimelineStepProps {
  label: string;
  isCompleted: boolean;
  isActive: boolean;
  progressInStep: number;
}

const TimelineStep: React.FC<TimelineStepProps> = ({ 
  label,
  isCompleted,
  isActive,
  progressInStep 
}) => {
  return (
    <div className="relative">
      {/* Circle with icon or progress */}
      <div className="relative z-10">
        <div className={cn(
          "h-10 w-10 rounded-full border-2 center-flex",
          isCompleted 
            ? "bg-primary-dark border-primary-dark text-white"
            : isActive
              ? "border-primary bg-white"
              : "border-gray-300 bg-white"
        )}>
          {isCompleted ? (
            <Check size={18} />
          ) : isActive ? (
            <div className="h-6 w-6 rounded-full bg-primary opacity-70" 
                 style={{ transform: `scale(${progressInStep / 100})` }} />
          ) : null}
        </div>
      </div>
      
      {/* Label */}
      <div className="mt-2 text-sm">
        <p className={cn(
          "font-medium",
          isCompleted ? "text-primary-dark" : 
          isActive ? "text-primary" : "text-gray-500"
        )}>
          {label}
        </p>
      </div>
    </div>
  );
};

export default TimelineStep;

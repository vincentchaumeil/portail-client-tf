
import React from 'react';
import { cn } from '@/lib/utils';

type OrderStatus = 'en cours' | 'expédiée' | 'livrée';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium shadow-sm";
  
  const statusStyles = {
    'en cours': "bg-blue-50 text-blue-700 border border-blue-100",
    'expédiée': "bg-orange-50 text-orange-700 border border-orange-100",
    'livrée': "bg-green-50 text-green-700 border border-green-100"
  };
  
  return (
    <span className={cn(baseClasses, statusStyles[status], className)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;

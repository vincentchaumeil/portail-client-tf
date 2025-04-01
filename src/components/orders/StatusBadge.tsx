
import React from 'react';
import { cn } from '@/lib/utils';

type OrderStatus = 'en cours' | 'expédiée' | 'livrée';

interface StatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  
  const statusStyles = {
    'en cours': "bg-blue-100 text-blue-800",
    'expédiée': "bg-orange-100 text-orange-800",
    'livrée': "bg-green-100 text-green-800"
  };
  
  return (
    <span className={cn(baseClasses, statusStyles[status], className)}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;

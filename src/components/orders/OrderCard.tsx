
import React from 'react';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';
import { cn } from '@/lib/utils';
import { Order } from '@/types';
import { CalendarDays, Hash } from 'lucide-react';

interface OrderCardProps {
  order: Order;
  isActive: boolean;
  onClick: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isActive, onClick }) => {
  return (
    <div 
      className={cn(
        "bg-white border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]",
        isActive ? "ring-2 ring-primary shadow-md" : "shadow-sm"
      )}
      onClick={onClick}
    >
      <div className="between-flex mb-4">
        <h3 className="text-lg font-semibold text-primary-dark bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">Commande #{order.orderNumber}</h3>
        <StatusBadge status={order.status} />
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-muted-foreground mb-1">Progression</p>
        <div className="between-flex">
          <ProgressBar percentage={order.progressPercentage} />
          <span className="ml-3 font-medium text-sm">{order.progressPercentage}%</span>
        </div>
      </div>
      
      <div className="flex flex-col space-y-2 mt-5 text-sm text-muted-foreground">
        <div className="flex items-center">
          <CalendarDays size={14} className="mr-2 text-gray-400" />
          <span>{order.date}</span>
        </div>
        <div className="flex items-center">
          <Hash size={14} className="mr-2 text-gray-400" />
          <span>Ref: {order.reference}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

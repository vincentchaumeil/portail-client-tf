
import React from 'react';
import StatusBadge from './StatusBadge';
import ProgressBar from './ProgressBar';
import { cn } from '@/lib/utils';
import { Order } from '@/types';

interface OrderCardProps {
  order: Order;
  isActive: boolean;
  onClick: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, isActive, onClick }) => {
  return (
    <div 
      className={cn(
        "bg-white border rounded-lg p-5 cursor-pointer transition-all-300 shadow-card hover:shadow-card-hover",
        isActive && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <div className="between-flex mb-4">
        <h3 className="text-lg font-semibold">Commande #{order.orderNumber}</h3>
        <StatusBadge status={order.status} />
      </div>
      
      <div className="mb-2">
        <p className="text-sm text-muted-foreground mb-1">Progression</p>
        <div className="between-flex">
          <ProgressBar percentage={order.progressPercentage} />
          <span className="ml-3 font-medium text-sm">{order.progressPercentage}%</span>
        </div>
      </div>
      
      <div className="between-flex mt-4 text-sm text-muted-foreground">
        <span>Date: {order.date}</span>
        <span>Ref: {order.reference}</span>
      </div>
    </div>
  );
};

export default OrderCard;

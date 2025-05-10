
import React from 'react';
import { Order } from '@/types';
import OrderCard from './OrderCard';

interface OrdersContainerProps {
  orders: Order[];
  onSelectOrder?: (orderId: string) => void;
  selectedOrderId?: string | null;
}

const OrdersContainer: React.FC<OrdersContainerProps> = ({ 
  orders,
  onSelectOrder = () => {},
  selectedOrderId = null
}) => {
  return (
    <div className="px-1">
      <h2 className="text-xl font-semibold mb-8 pl-1">Commandes récentes</h2>
      
      {orders.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {orders.map(order => (
            <OrderCard 
              key={order.id} 
              order={order}
              isActive={selectedOrderId === order.id}
              onClick={() => onSelectOrder(order.id)}
              className="order-card w-full"
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50/70 backdrop-blur-sm p-10 rounded-xl text-center border border-gray-100/60">
          <p className="text-gray-500">Aucune commande trouvée</p>
        </div>
      )}
    </div>
  );
};

export default OrdersContainer;

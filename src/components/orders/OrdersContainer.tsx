
import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import OrderCard from './OrderCard';
import OrderDetailPanel from './OrderDetailPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Order } from '@/types';

interface OrdersContainerProps {
  orders: Order[];
}

type FilterType = 'all' | 'in-progress' | 'shipped' | 'delivered';

const OrdersContainer: React.FC<OrdersContainerProps> = ({ orders }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  // Filter and search orders
  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => {
        // Apply status filter
        if (activeFilter === 'all') return true;
        if (activeFilter === 'in-progress' && order.status === 'en cours') return true;
        if (activeFilter === 'shipped' && order.status === 'expédiée') return true;
        if (activeFilter === 'delivered' && order.status === 'livrée') return true;
        return false;
      })
      .filter(order => {
        // Apply search
        if (!searchQuery) return true;
        return order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
               order.reference.toLowerCase().includes(searchQuery.toLowerCase());
      })
      // Sort by progress percentage
      .sort((a, b) => b.progressPercentage - a.progressPercentage);
  }, [orders, activeFilter, searchQuery]);
  
  const selectedOrder = useMemo(() => {
    return orders.find(order => order.id === selectedOrderId) || null;
  }, [orders, selectedOrderId]);
  
  // Navigation between orders in detail panel
  const handlePrevious = () => {
    if (!selectedOrderId) return;
    
    const currentIndex = filteredOrders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex > 0) {
      setSelectedOrderId(filteredOrders[currentIndex - 1].id);
    }
  };
  
  const handleNext = () => {
    if (!selectedOrderId) return;
    
    const currentIndex = filteredOrders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex < filteredOrders.length - 1) {
      setSelectedOrderId(filteredOrders[currentIndex + 1].id);
    }
  };
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Liste des commandes ({filteredOrders.length})</h2>
      </div>
      
      {/* Filters and search */}
      <div className="between-flex mb-8">
        <div className="flex gap-3">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
            className="transition-all-300"
          >
            Tous
          </Button>
          <Button 
            variant={activeFilter === 'in-progress' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('in-progress')}
            className="transition-all-300"
          >
            En cours
          </Button>
          <Button 
            variant={activeFilter === 'shipped' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('shipped')}
            className="transition-all-300"
          >
            Expédiée
          </Button>
          <Button 
            variant={activeFilter === 'delivered' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('delivered')}
            className="transition-all-300"
          >
            Livrée
          </Button>
        </div>
        
        <div className="relative w-64">
          <Input
            placeholder="Rechercher une commande..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 transition-all-300 focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      
      {/* Order cards with increased gap */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <OrderCard
              key={order.id}
              order={order}
              isActive={order.id === selectedOrderId}
              onClick={() => setSelectedOrderId(order.id === selectedOrderId ? null : order.id)}
            />
          ))
        ) : (
          <div className="col-span-2 py-12 text-center text-muted-foreground">
            Aucune commande ne correspond à vos critères de recherche
          </div>
        )}
      </div>
      
      {/* Detail panel */}
      <OrderDetailPanel
        order={selectedOrder}
        onClose={() => setSelectedOrderId(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </div>
  );
};

export default OrdersContainer;

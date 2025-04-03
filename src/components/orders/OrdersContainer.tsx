
import React, { useState, useMemo } from 'react';
import { Search, ArrowDownAZ, ArrowUpAZ, BarChart2 } from 'lucide-react';
import OrderCard from './OrderCard';
import OrderDetailPanel from './OrderDetailPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Order } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrdersContainerProps {
  orders: Order[];
}

type FilterType = 'all' | 'in-progress' | 'shipped' | 'delivered';
type SortField = 'orderNumber' | 'progressPercentage';
type SortDirection = 'asc' | 'desc';

const OrdersContainer: React.FC<OrdersContainerProps> = ({ orders }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('progressPercentage');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // Toggle sort direction or set a new sort field
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
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
      // Sort by selected field and direction
      .sort((a, b) => {
        if (sortField === 'orderNumber') {
          const orderNumberA = a.orderNumber.replace(/\D/g, '');
          const orderNumberB = b.orderNumber.replace(/\D/g, '');
          const numA = parseInt(orderNumberA, 10);
          const numB = parseInt(orderNumberB, 10);
          return sortDirection === 'asc' ? numA - numB : numB - numA;
        } else {
          return sortDirection === 'asc' 
            ? a.progressPercentage - b.progressPercentage 
            : b.progressPercentage - a.progressPercentage;
        }
      });
  }, [orders, activeFilter, searchQuery, sortField, sortDirection]);
  
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
  
  // Get the appropriate icon for the sort button
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUpAZ size={16} /> : <ArrowDownAZ size={16} />;
  };
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold">Liste des commandes ({filteredOrders.length})</h2>
        
        {/* Sort dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <BarChart2 size={16} />
              Trier par
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem 
              onClick={() => handleSort('orderNumber')}
              className="flex items-center justify-between"
            >
              <span>Numéro de commande</span>
              {getSortIcon('orderNumber')}
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleSort('progressPercentage')}
              className="flex items-center justify-between"
            >
              <span>Avancement</span>
              {getSortIcon('progressPercentage')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-3">
          <Button 
            variant={activeFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('all')}
            className="transition-all duration-300"
            size="sm"
          >
            Tous
          </Button>
          <Button 
            variant={activeFilter === 'in-progress' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('in-progress')}
            className="transition-all duration-300"
            size="sm"
          >
            En cours
          </Button>
          <Button 
            variant={activeFilter === 'shipped' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('shipped')}
            className="transition-all duration-300"
            size="sm"
          >
            Expédiée
          </Button>
          <Button 
            variant={activeFilter === 'delivered' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('delivered')}
            className="transition-all duration-300"
            size="sm"
          >
            Livrée
          </Button>
        </div>
        
        <div className="relative w-full md:w-64">
          <Input
            placeholder="Rechercher une commande..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary focus:border-transparent"
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

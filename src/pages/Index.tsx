
import React, { useState } from 'react';
import AppTopbar from '@/components/layout/AppTopbar';
import OrdersContainer from '@/components/orders/OrdersContainer';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import { mockOrders } from '@/data/mockOrders';
import { usePreferences } from '@/hooks/use-preferences';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import OrderDetailPanel from '@/components/orders/OrderDetailPanel';
import { Order } from '@/types';

const Index = () => {
  const { preferences } = usePreferences();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Filter orders by status if needed
  const filteredOrders = statusFilter
    ? mockOrders.filter(order => order.status === statusFilter)
    : mockOrders;
  
  const selectedOrder = selectedOrderId
    ? mockOrders.find(order => order.id === selectedOrderId)
    : null;
  
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(prevId => prevId === orderId ? null : orderId);
  };
  
  const handlePreviousOrder = () => {
    if (!selectedOrderId) return;
    const currentIndex = filteredOrders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex > 0) {
      setSelectedOrderId(filteredOrders[currentIndex - 1].id);
    }
  };
  
  const handleNextOrder = () => {
    if (!selectedOrderId) return;
    const currentIndex = filteredOrders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex < filteredOrders.length - 1) {
      setSelectedOrderId(filteredOrders[currentIndex + 1].id);
    }
  };
  
  const handleStatusFilterClick = (status: string | null) => {
    setStatusFilter(prevStatus => prevStatus === status ? null : status);
    setSelectedOrderId(null);
  };
  
  // Handle click outside to close detail panel
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // If clicking on an element inside the detail panel, don't close it
    if (target.closest('.order-detail-panel')) return;
    
    // If clicking on an order card, don't close the panel as the card's onClick will handle it
    if (target.closest('.order-card')) return;
    
    setSelectedOrderId(null);
  };
  
  const getFontSizeClass = () => {
    switch(preferences.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };
  
  const spacingClass = preferences.compactView ? 'space-y-4' : 'space-y-8';
  
  return (
    <AppLayout>
      <AppTopbar title="Tableau de bord" />
      
      <main 
        className={`flex-1 overflow-auto p-6 md:p-8 ${getFontSizeClass()}`}
        onClick={handleOutsideClick}
      >
        <div className={`${spacingClass}`}>
          {/* Dashboard Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DashboardSummary 
              orders={mockOrders} 
              onStatusClick={handleStatusFilterClick}
              activeStatus={statusFilter}
            />
          </motion.div>
          
          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <OrdersContainer 
              orders={filteredOrders} 
              onSelectOrder={handleSelectOrder}
              selectedOrderId={selectedOrderId}
            />
          </motion.div>
        </div>
      </main>
      
      {/* Order detail panel */}
      <OrderDetailPanel 
        order={selectedOrder}
        onClose={() => setSelectedOrderId(null)}
        onPrevious={handlePreviousOrder}
        onNext={handleNextOrder}
        className="order-detail-panel"
      />
    </AppLayout>
  );
};

export default Index;


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
  
  const selectedOrder = selectedOrderId
    ? mockOrders.find(order => order.id === selectedOrderId)
    : null;
  
  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(prevId => prevId === orderId ? null : orderId);
  };
  
  const handlePreviousOrder = () => {
    if (!selectedOrderId) return;
    const currentIndex = mockOrders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex > 0) {
      setSelectedOrderId(mockOrders[currentIndex - 1].id);
    }
  };
  
  const handleNextOrder = () => {
    if (!selectedOrderId) return;
    const currentIndex = mockOrders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex < mockOrders.length - 1) {
      setSelectedOrderId(mockOrders[currentIndex + 1].id);
    }
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
      
      <main className={`flex-1 overflow-auto p-6 md:p-8 ${getFontSizeClass()}`}>
        <div className={`${spacingClass}`}>
          {/* Dashboard Summary Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <DashboardSummary orders={mockOrders} />
          </motion.div>
          
          {/* Orders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <OrdersContainer 
              orders={mockOrders} 
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
      />
    </AppLayout>
  );
};

export default Index;

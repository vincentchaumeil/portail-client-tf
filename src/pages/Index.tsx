
import React from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import AppTopbar from '@/components/layout/AppTopbar';
import OrdersContainer from '@/components/orders/OrdersContainer';
import { mockOrders } from '@/data/mockOrders';

const Index = () => {
  return (
    <div className="flex h-screen bg-page">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopbar title="Tableau de bord" />
        
        <main className="flex-1 overflow-auto p-8">
          <OrdersContainer orders={mockOrders} />
        </main>
      </div>
    </div>
  );
};

export default Index;

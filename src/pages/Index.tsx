
import React from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import AppTopbar from '@/components/layout/AppTopbar';
import OrdersContainer from '@/components/orders/OrdersContainer';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import { mockOrders } from '@/data/mockOrders';

const Index = () => {
  return (
    <div className="flex h-screen bg-page">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopbar title="Tableau de bord" />
        
        <main className="flex-1 overflow-auto p-8">
          {/* Dashboard Summary Section */}
          <DashboardSummary orders={mockOrders} />
          
          {/* Orders Section - with increased spacing */}
          <div className="mt-8">
            <OrdersContainer orders={mockOrders} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

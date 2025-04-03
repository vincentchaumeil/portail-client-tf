
import React from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import AppTopbar from '@/components/layout/AppTopbar';
import OrdersContainer from '@/components/orders/OrdersContainer';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import { mockOrders } from '@/data/mockOrders';

const Index = () => {
  return (
    <div className="flex h-screen bg-gray-50/70 backdrop-blur-sm overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopbar title="Tableau de bord" />
        
        <main className="flex-1 overflow-auto p-8">
          {/* Dashboard Summary Section */}
          <div className="animate-fade-in">
            <DashboardSummary orders={mockOrders} />
          </div>
          
          {/* Orders Section - with increased spacing */}
          <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <OrdersContainer orders={mockOrders} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;

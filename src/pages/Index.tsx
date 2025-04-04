
import React from 'react';
import AppSidebar from '@/components/layout/AppSidebar';
import AppTopbar from '@/components/layout/AppTopbar';
import OrdersContainer from '@/components/orders/OrdersContainer';
import DashboardSummary from '@/components/dashboard/DashboardSummary';
import { mockOrders } from '@/data/mockOrders';
import { usePreferences } from '@/hooks/use-preferences';

const Index = () => {
  const { preferences } = usePreferences();
  
  const getFontSizeClass = () => {
    switch(preferences.fontSize) {
      case 'small': return 'text-sm';
      case 'large': return 'text-lg';
      default: return 'text-base';
    }
  };
  
  const spacingClass = preferences.compactView ? 'space-y-4' : 'space-y-8';
  
  return (
    <div className="flex h-screen bg-gray-50/70 backdrop-blur-sm overflow-hidden">
      <AppSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AppTopbar title="Tableau de bord" />
        
        <main className={`flex-1 overflow-auto p-6 md:p-8 ${getFontSizeClass()}`}>
          <div className={`animate-fade-in ${spacingClass}`}>
            {/* Dashboard Summary Section */}
            <DashboardSummary orders={mockOrders} />
            
            {/* Orders Section */}
            <OrdersContainer orders={mockOrders} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;


import React, { useMemo } from 'react';
import { BarChart3, Package, Truck, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Order } from '@/types';

interface DashboardSummaryProps {
  orders: Order[];
  onStatusClick?: (status: string | null) => void;
  activeStatus?: string | null;
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
  isActive?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, onClick, isActive }) => (
  <Card 
    className={`shadow-card hover:shadow-card-hover transition-all-300 cursor-pointer ${
      isActive ? 'ring-2 ring-primary/50' : ''
    }`}
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

const DashboardSummary: React.FC<DashboardSummaryProps> = ({ 
  orders,
  onStatusClick = () => {},
  activeStatus = null
}) => {
  const stats = useMemo(() => {
    const total = orders.length;
    const inProgress = orders.filter(order => order.status === 'en cours').length;
    const shipped = orders.filter(order => order.status === 'expédiée').length;
    const delivered = orders.filter(order => order.status === 'livrée').length;
    
    return { total, inProgress, shipped, delivered };
  }, [orders]);
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Aperçu des commandes</h2>
      
      <div className="grid grid-cols-4 gap-6">
        <StatCard 
          title="Commandes totales" 
          value={stats.total} 
          icon={<BarChart3 className="h-6 w-6 text-white" />} 
          color="bg-primary-dark"
          onClick={() => onStatusClick(null)}
          isActive={activeStatus === null}
        />
        
        <StatCard 
          title="En cours" 
          value={stats.inProgress} 
          icon={<Package className="h-6 w-6 text-white" />} 
          color="bg-primary"
          onClick={() => onStatusClick('en cours')}
          isActive={activeStatus === 'en cours'}
        />
        
        <StatCard 
          title="Expédiées" 
          value={stats.shipped} 
          icon={<Truck className="h-6 w-6 text-white" />} 
          color="bg-highlight"
          onClick={() => onStatusClick('expédiée')}
          isActive={activeStatus === 'expédiée'}
        />
        
        <StatCard 
          title="Livrées" 
          value={stats.delivered} 
          icon={<CheckCircle className="h-6 w-6 text-white" />} 
          color="bg-green-500"
          onClick={() => onStatusClick('livrée')}
          isActive={activeStatus === 'livrée'}
        />
      </div>
    </div>
  );
};

export default DashboardSummary;

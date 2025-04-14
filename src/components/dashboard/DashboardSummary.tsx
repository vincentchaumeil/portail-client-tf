
import React, { useMemo } from 'react';
import { BarChart3, Package, Truck, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Order } from '@/types';
import { motion } from 'framer-motion';

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
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, onClick, isActive, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ 
      type: "spring", 
      stiffness: 300, 
      damping: 30,
      delay: delay 
    }}
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
  >
    <Card 
      className={`transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md ${
        isActive ? 'ring-2 ring-primary/30 bg-gradient-to-br from-blue-50/30 to-transparent' : ''
      }`}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
          <motion.div 
            className={`p-3 rounded-full ${color}`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
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
    <div className="px-1 mb-2">
      <h2 className="text-xl font-semibold mb-8 pl-1">Aperçu des commandes</h2>
      
      <div className="grid grid-cols-4 gap-5">
        <StatCard 
          title="Commandes totales" 
          value={stats.total} 
          icon={<BarChart3 className="h-6 w-6 text-white" />} 
          color="bg-primary-dark"
          onClick={() => onStatusClick(null)}
          isActive={activeStatus === null}
          delay={0}
        />
        
        <StatCard 
          title="En cours" 
          value={stats.inProgress} 
          icon={<Package className="h-6 w-6 text-white" />} 
          color="bg-primary"
          onClick={() => onStatusClick('en cours')}
          isActive={activeStatus === 'en cours'}
          delay={0.1}
        />
        
        <StatCard 
          title="Expédiées" 
          value={stats.shipped} 
          icon={<Truck className="h-6 w-6 text-white" />} 
          color="bg-highlight"
          onClick={() => onStatusClick('expédiée')}
          isActive={activeStatus === 'expédiée'}
          delay={0.2}
        />
        
        <StatCard 
          title="Livrées" 
          value={stats.delivered} 
          icon={<CheckCircle className="h-6 w-6 text-white" />} 
          color="bg-green-500"
          onClick={() => onStatusClick('livrée')}
          isActive={activeStatus === 'livrée'}
          delay={0.3}
        />
      </div>
    </div>
  );
};

export default DashboardSummary;

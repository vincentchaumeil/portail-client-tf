
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { Order } from '@/types';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import { usePreferences } from '@/hooks/use-preferences';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
  isActive: boolean;
  className?: string;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick, isActive, className }) => {
  const { preferences } = usePreferences();
  
  const getFontSizeClass = () => {
    switch(preferences.fontSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };
  
  const compactClass = preferences.compactView ? 'py-3' : 'py-4';
  
  // Parse the date string to a Date object before formatting
  const parseDate = (dateString: string) => {
    try {
      // Check if the date is in DD/MM/YYYY format
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        return parse(dateString, 'dd/MM/yyyy', new Date());
      }
      // If it's already a valid date string, just create a new Date object
      return new Date(dateString);
    } catch (error) {
      console.error("Error parsing date:", error);
      return new Date(); // Fallback to current date
    }
  };
  
  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        mass: 0.5
      }}
      className={className}
    >
      <Card 
        onClick={onClick}
        className={cn(`cursor-pointer transition-all border-transparent ${
          isActive 
            ? 'ring-2 ring-primary/30 shadow-lg bg-gradient-to-br from-blue-50/80 to-transparent' 
            : 'hover:shadow-md hover:border-gray-100'
        }`, className)}
        style={{ 
          borderRadius: '16px',
          boxShadow: isActive 
            ? '0 10px 25px -5px rgba(0, 0, 0, 0.05)'
            : '0 4px 10px -3px rgba(0, 0, 0, 0.02)'
        }}
      >
        <CardContent className={`px-5 ${compactClass} flex items-center justify-between`}>
          <div className="flex flex-col md:flex-row md:items-center md:gap-8 flex-grow">
            {/* Order number and reference */}
            <div className="min-w-[200px]">
              <h3 className={`font-bold ${getFontSizeClass()}`}>{order.orderNumber}</h3>
              <p className={`text-muted-foreground ${
                preferences.fontSize === 'small' ? 'text-xs' : 'text-sm'
              }`}>
                {order.reference.length > 25 ? `${order.reference.substring(0, 25)}...` : order.reference}
              </p>
            </div>
            
            {/* Client name and date */}
            <div className="min-w-[150px] mt-2 md:mt-0">
              <p className={`font-medium ${getFontSizeClass()}`}>{order.clientName}</p>
              <p className={`text-muted-foreground ${getFontSizeClass()}`}>
                {format(parseDate(order.date), 'PPP', { locale: fr })}
              </p>
            </div>
            
            {/* Treatment info if available */}
            {order.treatment && (
              <div className="mt-2 md:mt-0">
                <div className="py-1 px-2 bg-blue-50/80 rounded-md border border-blue-100/80 inline-flex items-center">
                  <span className={`text-primary ${
                    preferences.fontSize === 'small' ? 'text-xs' : 'text-sm'
                  }`}>
                    {order.treatment.name}
                  </span>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            {/* Progress bar */}
            <div className="hidden md:block w-[120px]">
              <div className="flex justify-between items-center mb-1.5">
                <span className={`text-xs text-gray-500 ${getFontSizeClass()}`}>Progression</span>
                <span className={`text-xs font-medium ${getFontSizeClass()}`}>{order.progressPercentage}%</span>
              </div>
              <Progress value={order.progressPercentage} className="h-1.5" />
            </div>
            
            <StatusBadge status={order.status} />
            
            {isActive && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="ml-2"
              >
                <ArrowRight className="text-primary h-5 w-5" />
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderCard;

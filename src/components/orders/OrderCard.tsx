
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { Order } from '@/types';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';
import { usePreferences } from '@/hooks/use-preferences';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
  isActive: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick, isActive }) => {
  const { preferences } = usePreferences();
  
  const getFontSizeClass = () => {
    switch(preferences.fontSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-base';
      default: return 'text-sm';
    }
  };
  
  const compactClass = preferences.compactView ? 'py-2' : 'py-3';
  
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
    <Card 
      onClick={onClick}
      className={`cursor-pointer transition-all hover:shadow-md ${
        isActive 
          ? 'ring-2 ring-primary/50 shadow-lg bg-gradient-to-r from-blue-50/80 to-transparent' 
          : 'hover:bg-gray-50'
      }`}
    >
      <CardHeader className={`pb-0 px-4 ${compactClass}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className={`font-bold ${getFontSizeClass()}`}>{order.orderNumber}</h3>
            <p className={`text-muted-foreground ${
              preferences.fontSize === 'small' ? 'text-xs' : 'text-sm'
            }`}>
              {order.reference}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>
      </CardHeader>
      <CardContent className={`px-4 ${compactClass}`}>
        <div className="flex justify-between items-center">
          <div>
            <p className={`text-muted-foreground ${getFontSizeClass()}`}>
              {format(parseDate(order.date), 'PPP', { locale: fr })}
            </p>
            <p className={`font-medium ${getFontSizeClass()}`}>{order.clientName}</p>
            
            {/* Treatment info if available */}
            {order.treatment && (
              <div className="mt-2 py-1 px-2 bg-blue-50 rounded-md border border-blue-100 inline-flex items-center">
                <span className={`text-primary ${
                  preferences.fontSize === 'small' ? 'text-xs' : 'text-sm'
                }`}>
                  {order.treatment.name}
                </span>
              </div>
            )}
          </div>
          {isActive && (
            <ArrowRight className="text-primary h-5 w-5 animate-pulse" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;

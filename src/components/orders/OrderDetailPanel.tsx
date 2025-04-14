
import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import OrderTimeline from './OrderTimeline';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface OrderDetailPanelProps {
  order: Order | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

const OrderDetailPanel: React.FC<OrderDetailPanelProps> = ({ 
  order, 
  onClose, 
  onPrevious,
  onNext,
  className
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Parse date function similar to OrderCard
  const parseDate = (dateString: string) => {
    try {
      if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
        return parse(dateString, 'dd/MM/yyyy', new Date());
      }
      return new Date(dateString);
    } catch (error) {
      console.error("Error parsing date:", error);
      return new Date();
    }
  };

  if (!order) return null;

  return (
    <div className={cn("fixed inset-y-0 right-0 w-1/3 bg-white/95 backdrop-blur-sm shadow-detail-panel p-8 animate-slide-in-right overflow-y-auto border-l border-gray-100", className)}>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
            Commande {order.orderNumber}
          </h2>
          {order.treatment && (
            <div className="mt-1 inline-flex px-2 py-1 bg-blue-50 rounded-md border border-blue-100">
              <span className="text-primary text-sm">Traitement: {order.treatment.name}</span>
            </div>
          )}
        </div>
        <button 
          onClick={onClose}
          className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-all duration-300"
        >
          <X size={20} />
        </button>
      </div>
      
      {/* Progress display */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progression</span>
          <span className="text-sm font-medium">{order.progressPercentage}%</span>
        </div>
        <Progress value={order.progressPercentage} className="h-2" />
      </div>
      
      <div className="space-y-8">
        <OrderTimeline order={order} />
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Détails de la commande</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50/70 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Référence</p>
              <p className="font-medium">{order.reference}</p>
            </div>
            <div className="bg-gray-50/70 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">
                {format(parseDate(order.date), 'PPP', { locale: fr })}
              </p>
            </div>
            <div className="bg-gray-50/70 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="font-medium capitalize">{order.status}</p>
            </div>
            <div className="bg-gray-50/70 p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">Client</p>
              <p className="font-medium">{order.clientName}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Produits</h3>
          <div className="space-y-3">
            {order.products.map((product, index) => (
              <div key={index} className="bg-gray-50/70 p-4 rounded-lg border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{product.name}</span>
                  <span className="bg-primary/10 text-primary-dark px-2 py-0.5 rounded text-xs font-medium">{product.quantity} unités</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{product.reference}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-10">
        <Button
          variant="outline"
          onClick={onPrevious}
          className="flex items-center gap-2 hover:bg-gray-100"
        >
          <ArrowLeft size={16} />
          Précédent
        </Button>
        
        <Button
          variant="outline"
          onClick={onNext}
          className="flex items-center gap-2 hover:bg-gray-100"
        >
          Suivant
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default OrderDetailPanel;

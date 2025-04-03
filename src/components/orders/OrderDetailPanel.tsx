
import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import OrderTimeline from './OrderTimeline';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';

interface OrderDetailPanelProps {
  order: Order | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const OrderDetailPanel: React.FC<OrderDetailPanelProps> = ({ 
  order, 
  onClose, 
  onPrevious,
  onNext
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!order) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-1/3 bg-white/95 backdrop-blur-sm shadow-detail-panel p-8 animate-slide-in-right overflow-y-auto border-l border-gray-100">
      <div className="between-flex mb-6">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">Commande #{order.orderNumber}</h2>
        <button 
          onClick={onClose}
          className="h-10 w-10 rounded-full hover:bg-gray-100 center-flex transition-all-300"
        >
          <X size={20} />
        </button>
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
              <p className="font-medium">{order.date}</p>
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
                <div className="between-flex">
                  <span className="font-medium">{product.name}</span>
                  <span className="bg-primary/10 text-primary-dark px-2 py-0.5 rounded text-xs font-medium">{product.quantity} unités</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{product.reference}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="between-flex mt-10">
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

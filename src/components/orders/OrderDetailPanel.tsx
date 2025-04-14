
import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import OrderTimeline from './OrderTimeline';
import { Order } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { format, parse } from 'date-fns';
import { fr } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

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
    <AnimatePresence>
      {order && (
        <motion.div 
          initial={{ x: '100%', opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 30
          }}
          className={cn("fixed inset-y-0 right-0 w-1/3 bg-white/90 backdrop-blur-sm shadow-detail-panel p-10 overflow-y-auto border-l border-gray-100/60", className)}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary-dark to-primary bg-clip-text text-transparent">
                Commande {order.orderNumber}
              </h2>
              {order.treatment && (
                <div className="mt-2 inline-flex px-3 py-1 bg-blue-50/80 rounded-md border border-blue-100/80">
                  <span className="text-primary text-sm">Traitement: {order.treatment.name}</span>
                </div>
              )}
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="h-10 w-10 rounded-full hover:bg-gray-100/80 flex items-center justify-center transition-all duration-300"
            >
              <X size={20} />
            </motion.button>
          </div>
          
          {/* Progress display */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Progression</span>
              <span className="text-sm font-medium">{order.progressPercentage}%</span>
            </div>
            <Progress value={order.progressPercentage} className="h-2" />
          </div>
          
          <div className="space-y-10">
            <OrderTimeline order={order} />
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Détails de la commande</h3>
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-gray-50/70 p-4 rounded-xl"
                >
                  <p className="text-sm text-muted-foreground">Référence</p>
                  <p className="font-medium">{order.reference}</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-gray-50/70 p-4 rounded-xl"
                >
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">
                    {format(parseDate(order.date), 'PPP', { locale: fr })}
                  </p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-gray-50/70 p-4 rounded-xl"
                >
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{order.status}</p>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-gray-50/70 p-4 rounded-xl"
                >
                  <p className="text-sm text-muted-foreground">Client</p>
                  <p className="font-medium">{order.clientName}</p>
                </motion.div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Produits</h3>
              <div className="space-y-3">
                {order.products.map((product, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-50/70 p-4 rounded-xl border border-gray-100/60"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{product.name}</span>
                      <span className="bg-primary/10 text-primary-dark px-2 py-0.5 rounded-full text-xs font-medium">{product.quantity} unités</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{product.reference}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-12">
            <motion.div whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={onPrevious}
                className="flex items-center gap-2 hover:bg-gray-100/80 border-gray-200/60"
              >
                <ArrowLeft size={16} />
                Précédent
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ x: 3 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={onNext}
                className="flex items-center gap-2 hover:bg-gray-100/80 border-gray-200/60"
              >
                Suivant
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailPanel;

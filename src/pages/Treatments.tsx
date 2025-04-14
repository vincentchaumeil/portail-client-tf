
import React, { useState } from 'react';
import AppTopbar from '@/components/layout/AppTopbar';
import AppLayout from '@/components/layout/AppLayout';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { mockOrders } from '@/data/mockOrders';
import { mockTreatments, getOrdersByTreatment } from '@/data/mockTreatments';
import { Treatment, TreatmentType, Order } from '@/types';
import OrderCard from '@/components/orders/OrderCard';
import OrderDetailPanel from '@/components/orders/OrderDetailPanel';
import { ArrowRight, Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

const Treatments = () => {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Filter orders by treatment and search query
  const filteredOrders = selectedTreatment 
    ? getOrdersByTreatment(mockOrders, selectedTreatment).filter(order => 
        order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
        order.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.clientName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  
  const selectedOrder = selectedOrderId
    ? mockOrders.find(order => order.id === selectedOrderId)
    : null;
    
  // Navigation between orders in detail panel
  const handlePreviousOrder = () => {
    if (!selectedOrderId) return;
    const currentIndex = filteredOrders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex > 0) {
      setSelectedOrderId(filteredOrders[currentIndex - 1].id);
    }
  };
  
  const handleNextOrder = () => {
    if (!selectedOrderId) return;
    const currentIndex = filteredOrders.findIndex(order => order.id === selectedOrderId);
    if (currentIndex < filteredOrders.length - 1) {
      setSelectedOrderId(filteredOrders[currentIndex + 1].id);
    }
  };

  // Handle click outside to close detail panel
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    // If clicking on an element inside the detail panel, don't close it
    if (target.closest('.order-detail-panel')) return;
    
    // If clicking on an order card, don't close the panel as the card's onClick will handle it
    if (target.closest('.order-card')) return;
    
    setSelectedOrderId(null);
  };

  return (
    <AppLayout>
      <AppTopbar title="Traitements" />
      <motion.div 
        className="flex-1 overflow-auto p-6 md:p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onClick={handleOutsideClick}
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Traitements disponibles</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockTreatments.map((treatment) => (
              <TreatmentCard 
                key={treatment.id} 
                treatment={treatment}
                isSelected={selectedTreatment === treatment.name}
                onClick={() => {
                  setSelectedTreatment(prev => prev === treatment.name ? null : treatment.name);
                  setSelectedOrderId(null);
                }}
                ordersCount={getOrdersByTreatment(mockOrders, treatment.name).length}
              />
            ))}
          </div>
          
          {/* Orders related to selected treatment */}
          {selectedTreatment && (
            <div className="mt-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  Commandes avec traitement "{selectedTreatment}" ({filteredOrders.length})
                </h2>
                
                {/* Search bar */}
                <div className="relative w-64">
                  <Input
                    type="text"
                    placeholder="Rechercher une commande..."
                    className="pl-10 pr-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
              
              {filteredOrders.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredOrders.map(order => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      isActive={selectedOrderId === order.id}
                      onClick={() => setSelectedOrderId(prevId => prevId === order.id ? null : order.id)}
                      className="order-card"
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Aucune commande trouvée pour ce traitement</p>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>
      
      {/* Order detail panel */}
      <OrderDetailPanel 
        order={selectedOrder}
        onClose={() => setSelectedOrderId(null)}
        onPrevious={handlePreviousOrder}
        onNext={handleNextOrder}
        className="order-detail-panel"
      />
    </AppLayout>
  );
};

// Treatment card component
interface TreatmentCardProps {
  treatment: Treatment;
  isSelected: boolean;
  onClick: () => void;
  ordersCount: number;
}

const TreatmentCard: React.FC<TreatmentCardProps> = ({ treatment, isSelected, onClick, ordersCount }) => {
  // Icon mapping for treatments
  const getIcon = (name: string) => {
    switch(name) {
      case 'Alodine': return '⚡';
      case 'Silvering': return '✨';
      case 'Cadmium plating': return '🛡️';
      case 'Copper plating': return '🔶';
      case 'Gilding': return '🌟';
      case 'Tin-Lead plating': return '🔧';
      case 'Tinning': return '🧩';
      default: return '🔬';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      className={`bg-white rounded-lg shadow-md overflow-hidden border ${
        isSelected ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="text-3xl mr-3">{getIcon(treatment.name)}</div>
          <h3 className="text-lg font-semibold text-gray-800">{treatment.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-4 text-sm">{treatment.description}</p>
        
        <div className="border-t border-gray-100 pt-4 mt-4">
          <div className="flex justify-between text-sm">
            <div>
              <p className="text-gray-500">Durée</p>
              <p className="font-medium">{treatment.duration}h</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Prix</p>
              <p className="font-medium">{treatment.price.toFixed(2)} €</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 px-6 py-3 flex justify-between items-center">
        <span className="text-primary text-sm font-medium">
          {ordersCount} {ordersCount === 1 ? 'commande' : 'commandes'}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          isSelected ? 'bg-primary text-white' : 'bg-primary/10 text-primary'
        }`}>
          {isSelected ? 'Sélectionné' : 'Voir détails'}
        </span>
      </div>
    </motion.div>
  );
};

export default Treatments;

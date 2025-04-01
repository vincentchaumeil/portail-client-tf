
import React from 'react';
import TimelineStep from './TimelineStep';
import { Order } from '@/types';

interface OrderTimelineProps {
  order: Order;
}

// The fixed production steps
const PRODUCTION_STEPS = [
  "Commande reçue",
  "Préparation",
  "Fabrication",
  "Contrôle qualité",
  "Expédition"
];

const OrderTimeline: React.FC<OrderTimelineProps> = ({ order }) => {
  // Calculate which step is currently active and the progress within that step
  const totalSteps = PRODUCTION_STEPS.length;
  const stepSize = 100 / totalSteps;
  const currentStepIndex = Math.min(Math.floor(order.progressPercentage / stepSize), totalSteps - 1);
  const progressInCurrentStep = ((order.progressPercentage % stepSize) / stepSize) * 100;

  return (
    <div className="pb-6">
      <h3 className="text-lg font-semibold mb-6">Avancement de la production</h3>
      
      <div className="flex justify-between items-start relative">
        {/* Line connecting the steps */}
        <div className="absolute top-5 left-5 right-5 h-0.5 bg-gray-300" />
        
        {/* Steps */}
        {PRODUCTION_STEPS.map((step, index) => (
          <TimelineStep
            key={step}
            label={step}
            isCompleted={index < currentStepIndex}
            isActive={index === currentStepIndex}
            progressInStep={index === currentStepIndex ? progressInCurrentStep : 0}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderTimeline;

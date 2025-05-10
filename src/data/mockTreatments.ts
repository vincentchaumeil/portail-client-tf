
import { Treatment, TreatmentType, Order } from '@/types';
import { mockOrders } from './mockOrders';

export const treatmentTypes: TreatmentType[] = [
  'Passivation sur Inox',
  'Passivation Inox à l\'attache',
  'Passivation sur inox Methode 1',
  'Décapage',
  'Décapage et passivation',
  'Désoxydation sur Inconel',
  'Détraitement + OAS Bleue',
  'OAS Bleue - À l\'attache',
  'Ni(II) + Sn',
  'Sablage + Ag'
];

// Extract treatments from orders to ensure consistency
export const mockTreatments: Treatment[] = mockOrders
  .map(order => order.treatment)
  .filter((treatment, index, self) => 
    treatment && self.findIndex(t => t?.id === treatment.id) === index
  ) as Treatment[];

// Get orders filtered by treatment type
export const getOrdersByTreatment = (orders: Order[], treatmentName: TreatmentType): Order[] => {
  return orders.filter(order => order.treatment?.name === treatmentName);
};


import { Treatment, TreatmentType } from '@/types';

export const treatmentTypes: TreatmentType[] = [
  'Alodine',
  'Silvering',
  'Cadmium plating',
  'Copper plating',
  'Gilding',
  'Tin-Lead plating',
  'Tinning'
];

export const mockTreatments: Treatment[] = [
  {
    id: 't1',
    name: 'Alodine',
    description: 'Chemical conversion coating for aluminum that provides corrosion resistance and promotes paint adhesion.',
    duration: 24,
    price: 45.99
  },
  {
    id: 't2',
    name: 'Silvering',
    description: 'Electroplating process that deposits a layer of silver on the surface of an object.',
    duration: 48,
    price: 89.99
  },
  {
    id: 't3',
    name: 'Cadmium plating',
    description: 'Electroplating process that applies a thin layer of cadmium to steel, iron, brass, or other metals.',
    duration: 36,
    price: 67.50
  },
  {
    id: 't4',
    name: 'Copper plating',
    description: 'Process of plating a layer of copper onto a metal object, providing conductivity and base for other coatings.',
    duration: 18,
    price: 42.75
  },
  {
    id: 't5',
    name: 'Gilding',
    description: 'Application of gold leaf or powder to solid surfaces like stone, wood, metal, or ceramic.',
    duration: 72,
    price: 149.99
  },
  {
    id: 't6',
    name: 'Tin-Lead plating',
    description: 'Electrodeposition of an alloy of tin and lead, providing solderability and corrosion resistance.',
    duration: 24,
    price: 58.25
  },
  {
    id: 't7',
    name: 'Tinning',
    description: 'Process of coating sheet steel or iron with tin, creating a corrosion-resistant product.',
    duration: 20,
    price: 53.50
  }
];

// Update some mock orders to include treatments
export const assignTreatmentsToOrders = (orders: any[]) => {
  const updatedOrders = [...orders];
  
  updatedOrders.forEach((order, index) => {
    // Assign treatments to some orders (not all of them)
    if (index % 2 === 0) {
      const treatmentIndex = index % mockTreatments.length;
      order.treatment = mockTreatments[treatmentIndex];
    }
  });
  
  return updatedOrders;
};

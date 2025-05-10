
export interface Product {
  name: string;
  reference: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  reference: string;
  date: string;
  clientName: string;
  status: 'en cours' | 'expédiée' | 'livrée';
  progressPercentage: number;
  products: Product[];
  treatment?: Treatment;
}

export interface Treatment {
  id: string;
  name: TreatmentType;
  description: string;
  duration: number; // in hours
  price: number;
}

export type TreatmentType = 
  'Passivation sur Inox' | 
  'Passivation Inox à l\'attache' | 
  'Passivation sur inox Methode 1' | 
  'Décapage' | 
  'Décapage et passivation' | 
  'Désoxydation sur Inconel' | 
  'Détraitement + OAS Bleue' | 
  'OAS Bleue - À l\'attache' | 
  'Ni(II) + Sn' | 
  'Sablage + Ag';

export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large';
  showLogo: boolean;
  compactView: boolean;
}

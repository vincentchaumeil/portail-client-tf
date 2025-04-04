
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

export type TreatmentType = 'Alodine' | 'Silvering' | 'Cadmium plating' | 'Copper plating' | 'Gilding' | 'Tin-Lead plating' | 'Tinning';

export interface UserPreferences {
  fontSize: 'small' | 'medium' | 'large';
  showLogo: boolean;
  compactView: boolean;
}

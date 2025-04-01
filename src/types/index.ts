
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
}


import { Order } from '@/types';

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'CMD-2023-001',
    reference: 'REF-A1234',
    date: '15/04/2023',
    clientName: 'Industrie Durand',
    status: 'en cours',
    progressPercentage: 85,
    products: [
      { name: 'Machine à commande numérique XL400', reference: 'MCN-XL400', quantity: 1 },
      { name: 'Kit de maintenance complet', reference: 'KMC-200', quantity: 2 }
    ]
  },
  {
    id: '2',
    orderNumber: 'CMD-2023-002',
    reference: 'REF-B5678',
    date: '22/04/2023',
    clientName: 'Mécanique Martin SARL',
    status: 'en cours',
    progressPercentage: 45,
    products: [
      { name: 'Système hydraulique H-300', reference: 'SH-300', quantity: 3 },
      { name: 'Compresseur industriel CI-500', reference: 'CI-500', quantity: 1 }
    ]
  },
  {
    id: '3',
    orderNumber: 'CMD-2023-003',
    reference: 'REF-C9012',
    date: '30/04/2023',
    clientName: 'Automatismes Léger',
    status: 'expédiée',
    progressPercentage: 100,
    products: [
      { name: 'Capteurs de pression CP-100 (lot)', reference: 'CP-100-LOT', quantity: 10 },
      { name: 'Boîtier de contrôle BC-200', reference: 'BC-200', quantity: 5 }
    ]
  },
  {
    id: '4',
    orderNumber: 'CMD-2023-004',
    reference: 'REF-D3456',
    date: '05/05/2023',
    clientName: 'Technologies Blanc SA',
    status: 'livrée',
    progressPercentage: 100,
    products: [
      { name: 'Robot articulé RA-600', reference: 'RA-600', quantity: 2 },
      { name: 'Interface homme-machine IHM-T10', reference: 'IHM-T10', quantity: 2 },
      { name: 'Logiciel de contrôle LC-PRO', reference: 'LC-PRO', quantity: 1 }
    ]
  },
  {
    id: '5',
    orderNumber: 'CMD-2023-005',
    reference: 'REF-E7890',
    date: '12/05/2023',
    clientName: 'Industrie Durand',
    status: 'en cours',
    progressPercentage: 15,
    products: [
      { name: 'Système de convoyage SC-800', reference: 'SC-800', quantity: 1 },
      { name: 'Moteurs électriques ME-400 (lot)', reference: 'ME-400-LOT', quantity: 4 }
    ]
  },
  {
    id: '6',
    orderNumber: 'CMD-2023-006',
    reference: 'REF-F1234',
    date: '18/05/2023',
    clientName: 'Automatismes Léger',
    status: 'livrée',
    progressPercentage: 100,
    products: [
      { name: 'Système de vision industrielle SVI-200', reference: 'SVI-200', quantity: 3 },
      { name: 'Caméras haute résolution CHR-100 (lot)', reference: 'CHR-100-LOT', quantity: 6 }
    ]
  },
  {
    id: '7',
    orderNumber: 'CMD-2023-007',
    reference: 'REF-G5678',
    date: '23/05/2023',
    clientName: 'Mécanique Martin SARL',
    status: 'expédiée',
    progressPercentage: 100,
    products: [
      { name: 'Outils de précision OP-300 (kit)', reference: 'OP-300-KIT', quantity: 2 },
      { name: 'Machine de mesure tridimensionnelle MMT-500', reference: 'MMT-500', quantity: 1 }
    ]
  },
  {
    id: '8',
    orderNumber: 'CMD-2023-008',
    reference: 'REF-H9012',
    date: '29/05/2023',
    clientName: 'Technologies Blanc SA',
    status: 'en cours',
    progressPercentage: 65,
    products: [
      { name: 'Panneau de contrôle PC-700', reference: 'PC-700', quantity: 4 },
      { name: 'Système de refroidissement SR-200', reference: 'SR-200', quantity: 2 }
    ]
  }
];

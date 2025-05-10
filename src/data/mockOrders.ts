
import { Order, Product, Treatment } from '@/types';

// Define treatments based on the provided data
const treatments: { [key: string]: Treatment } = {
  passivationInox: {
    id: 't1',
    name: 'Passivation sur Inox',
    description: 'Passivation sur Inox svt S10071',
    duration: 24,
    price: 45.99
  },
  passivationInoxAttache: {
    id: 't2',
    name: 'Passivation Inox à l\'attache',
    description: 'Passivation Inox à l\'attache svt S10071',
    duration: 24,
    price: 48.50
  },
  passivationInoxMethode1: {
    id: 't3',
    name: 'Passivation sur inox Methode 1',
    description: 'Passivation sur inox Methode 1 classe 2 Type 6 suivant AMS2700',
    duration: 36,
    price: 52.75
  },
  decapageST1061: {
    id: 't4',
    name: 'Décapage',
    description: 'Décapage suivant ST1061',
    duration: 18,
    price: 42.75
  },
  decapagePassivationST1061: {
    id: 't5',
    name: 'Décapage et passivation',
    description: 'Décapage et passivation suivant ST1061',
    duration: 32,
    price: 59.99
  },
  desoxydationInconel: {
    id: 't6',
    name: 'Désoxydation sur Inconel',
    description: 'Désoxydation sur Inconel 625 svt RPS15.00 Méthode 4',
    duration: 42,
    price: 89.99
  },
  detraitementOAS: {
    id: 't7',
    name: 'Détraitement + OAS Bleue',
    description: 'Détraitement + OAS Bleue sur Titane svt ITS500',
    duration: 48,
    price: 94.50
  },
  oasBleueAttache: {
    id: 't8',
    name: 'OAS Bleue - À l\'attache',
    description: 'OAS Bleue sur Titane - À l\'attache svt ITS500',
    duration: 36,
    price: 78.25
  },
  nickelEtain: {
    id: 't9',
    name: 'Ni(II) + Sn',
    description: 'Ni(II) 5 à 10µm + Sn 10 à 15µm suivant spécification S10052',
    duration: 54,
    price: 110.00
  },
  sablageArgent: {
    id: 't10',
    name: 'Sablage + Ag',
    description: 'Sablage + Ag 6 à 10µm suivant spécification DMP 12-050',
    duration: 60,
    price: 120.50
  }
};

// Define our orders based on the provided data
export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'CV25-03230',
    reference: '411703+PAS RESSORT(6181110)',
    date: '15/04/2023',
    clientName: 'Ressorts Lacroix',
    status: 'en cours',
    progressPercentage: 89.90,
    products: [
      { name: '411703+PAS RESSORT(6181110)', reference: '411703+PAS', quantity: 60 }
    ],
    treatment: treatments.passivationInox
  },
  {
    id: '2',
    orderNumber: 'CV25-01645',
    reference: '246059 RESSORT',
    date: '22/04/2023',
    clientName: 'Ressorts Lacroix',
    status: 'livrée',
    progressPercentage: 100,
    products: [
      { name: '246059 RESSORT', reference: '246059', quantity: 103 }
    ],
    treatment: treatments.passivationInoxAttache
  },
  {
    id: '3',
    orderNumber: 'CV25-03242',
    reference: 'Multi-articles',
    date: '30/04/2023',
    clientName: 'SAFRAN AEROSYSTEMS DUCTS',
    status: 'en cours',
    progressPercentage: 65,
    products: [
      { name: '3-3-09-0775 EMBOUT DN6', reference: '3-3-09-0775', quantity: 500 },
      { name: 'RR20502-02-DUC EMBOUT', reference: 'RR20502-02-DUC', quantity: 35 },
      { name: 'RR20502-02-DUC EMBOUT', reference: 'RR20502-02-DUC', quantity: 50 },
      { name: 'RR20502-03 EMBOUT', reference: 'RR20502-03', quantity: 50 },
      { name: 'RR20502-03 EMBOUT', reference: 'RR20502-03', quantity: 50 },
      { name: 'RR20502-04 EMBOUT', reference: 'RR20502-04', quantity: 50 },
      { name: 'RR20502-04 EMBOUT', reference: 'RR20502-04', quantity: 48 },
      { name: '4-3-03-0162 RENFORT', reference: '4-3-03-0162', quantity: 50 },
      { name: '4-3-03-0162 RENFORT', reference: '4-3-03-0162', quantity: 2 },
      { name: 'RR12101.03.C SPHERE', reference: 'RR12101.03.C', quantity: 240 },
      { name: '3-3-17-0039 FIXED FITTING', reference: '3-3-17-0039', quantity: 40 },
      { name: '3-3-05-0494+SAF EMBOUT DROIT', reference: '3-3-05-0494+SAF', quantity: 26 },
      { name: '3-3-05-0495+SAF EMBOUT GAUCHE', reference: '3-3-05-0495+SAF', quantity: 17 },
      { name: '3-3-05-0496+SAF CAPOT SPHERIQUE', reference: '3-3-05-0496+SAF', quantity: 2 },
      { name: '3-3-05-0498 RENFORT', reference: '3-3-05-0498', quantity: 69 }
    ],
    treatment: treatments.passivationInoxMethode1
  },
  {
    id: '4',
    orderNumber: 'CV25-03268',
    reference: 'LGPL19SP­V06B05AS+AUT+DET VIS',
    date: '05/05/2023',
    clientName: 'HFS HUCK FRANCE SAS',
    status: 'en cours',
    progressPercentage: 0,
    products: [
      { name: 'LGPL19SP­V06B05AS+AUT+DET VIS', reference: 'LGPL19SP', quantity: 6518 }
    ],
    treatment: treatments.detraitementOAS
  },
  {
    id: '5',
    orderNumber: 'CV25-03345',
    reference: 'XPL8BP­V20­31AS+ATT VIS (70,21gr)',
    date: '12/05/2023',
    clientName: 'HFS HUCK FRANCE SAS',
    status: 'en cours',
    progressPercentage: 0,
    products: [
      { name: 'XPL8BP­V20­31AS+ATT VIS (70,21gr)', reference: 'XPL8BP', quantity: 327 }
    ],
    treatment: treatments.oasBleueAttache
  },
  {
    id: '6',
    orderNumber: 'CV25-02476',
    reference: '731760 CORPS DE SONDE',
    date: '18/05/2023',
    clientName: 'SND MECA INDUSTRIE',
    status: 'en cours',
    progressPercentage: 88.10,
    products: [
      { name: '731760 CORPS DE SONDE', reference: '731760', quantity: 10 }
    ],
    treatment: treatments.nickelEtain
  },
  {
    id: '7',
    orderNumber: 'CV25-02529',
    reference: '334-003-519-1 PIED DE CENTRAGE',
    date: '23/05/2023',
    clientName: 'SND MECA INDUSTRIE',
    status: 'expédiée',
    progressPercentage: 97.30,
    products: [
      { name: '334-003-519-1 PIED DE CENTRAGE', reference: '334-003-519-1', quantity: 32 }
    ],
    treatment: treatments.sablageArgent
  }
];

// For compatibility with existing code
export const assignTreatmentsToOrders = (orders: Order[]): Order[] => {
  return orders;
};

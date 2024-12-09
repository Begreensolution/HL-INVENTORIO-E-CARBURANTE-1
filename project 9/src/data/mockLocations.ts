import { Location, Shipment } from '../types/location';

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Ospedale San Raffaele',
    address: 'Via Olgettina, 60',
    city: 'Milano',
    province: 'MI',
    type: 'hospital',
    contact: 'Dr. Rossi',
    phone: '+39 02 2643 2643'
  },
  {
    id: '2',
    name: 'Magazzino Centrale',
    address: 'Via dell\'Industria, 15',
    city: 'Bologna',
    province: 'BO',
    type: 'warehouse',
    contact: 'Sig. Bianchi',
    phone: '+39 051 123 4567'
  },
  {
    id: '3',
    name: 'Stazione 118 Roma Est',
    address: 'Via Tiburtina, 1100',
    city: 'Roma',
    province: 'RM',
    type: 'station',
    contact: 'Dott.ssa Verdi',
    phone: '+39 06 8976 5432'
  }
];

export const mockShipments: Shipment[] = [
  {
    id: '1',
    orderDate: '2024-03-15',
    estimatedDelivery: '2024-03-17',
    status: 'shipped',
    items: [
      { itemId: '1', quantity: 100 },
      { itemId: '2', quantity: 50 }
    ],
    fromLocation: '2',
    toLocation: '1',
    trackingNumber: 'SHP24031501',
    priority: 'high'
  },
  {
    id: '2',
    orderDate: '2024-03-14',
    estimatedDelivery: '2024-03-16',
    status: 'processing',
    items: [
      { itemId: '3', quantity: 300 },
      { itemId: '4', quantity: 20 }
    ],
    fromLocation: '2',
    toLocation: '3',
    trackingNumber: 'SHP24031402',
    priority: 'medium'
  }
];
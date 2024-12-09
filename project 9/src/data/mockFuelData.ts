import { FuelRecord, FuelConsumptionAnomaly } from '../types/fuel';

export const mockFuelRecords: FuelRecord[] = [
  {
    id: '1',
    date: '2024-03-15',
    ambulanceId: '1',
    liters: 45,
    cost: 85.50,
    kilometers: 12500,
    driverId: 'D001',
    notes: 'Rifornimento ordinario'
  },
  {
    id: '2',
    date: '2024-03-10',
    ambulanceId: '1',
    liters: 40,
    cost: 76.00,
    kilometers: 12200,
    driverId: 'D001'
  },
  {
    id: '3',
    date: '2024-03-05',
    ambulanceId: '1',
    liters: 42,
    cost: 79.80,
    kilometers: 11900,
    driverId: 'D001'
  }
];

export const mockFuelAnomalies: FuelConsumptionAnomaly[] = [
  {
    id: '1',
    ambulanceId: '1',
    date: '2024-03-15',
    type: 'high_consumption',
    description: 'Consumo carburante 25% superiore alla media',
    severity: 'high',
    status: 'new'
  },
  {
    id: '2',
    ambulanceId: '2',
    date: '2024-03-14',
    type: 'irregular_refill',
    description: 'Pattern di rifornimento irregolare',
    severity: 'medium',
    status: 'investigating'
  }
];
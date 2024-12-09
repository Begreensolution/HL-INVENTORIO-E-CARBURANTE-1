export interface FuelRecord {
  id: string;
  date: string;
  ambulanceId: string;
  liters: number;
  cost: number;
  kilometers: number;
  driverId: string;
  notes?: string;
}

export interface FuelConsumptionAnomaly {
  id: string;
  ambulanceId: string;
  date: string;
  type: 'high_consumption' | 'irregular_refill' | 'suspicious_pattern';
  description: string;
  severity: 'low' | 'medium' | 'high';
  status: 'new' | 'investigating' | 'resolved';
}
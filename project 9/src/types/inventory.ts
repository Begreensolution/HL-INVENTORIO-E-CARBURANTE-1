export interface InventoryItem {
  id: string;
  name: string;
  category: 'medication' | 'equipment' | 'supplies';
  currentStock: number;
  minimumStock: number;
  unit: string;
  expiryDate?: string;
  location: string;
  lastRestocked?: string;
  price: number;
}

export interface ChecklistItem {
  id: string;
  itemId: string;
  quantity: number;
  status: 'present' | 'missing' | 'expired' | 'low';
  notes?: string;
}

export interface ShiftReport {
  id: string;
  date: string;
  ambulanceId: string;
  driverId: string;
  checklist: ChecklistItem[];
  notes: string;
  status: 'pending' | 'completed';
}
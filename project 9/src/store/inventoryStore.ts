import { create } from 'zustand';
import { InventoryItem, ChecklistItem, ShiftReport } from '../types/inventory';
import { mockInventory } from '../data/mockData';

interface InventoryStore {
  inventory: InventoryItem[];
  checklist: ChecklistItem[];
  shiftReports: ShiftReport[];
  addInventoryItem: (item: InventoryItem) => void;
  updateStock: (itemId: string, quantity: number) => void;
  submitShiftReport: (report: ShiftReport) => void;
}

export const useInventoryStore = create<InventoryStore>((set) => ({
  inventory: mockInventory,
  checklist: [],
  shiftReports: [],
  
  addInventoryItem: (item) =>
    set((state) => ({
      inventory: [...state.inventory, item],
    })),
    
  updateStock: (itemId, quantity) =>
    set((state) => ({
      inventory: state.inventory.map((item) =>
        item.id === itemId
          ? { ...item, currentStock: item.currentStock + quantity }
          : item
      ),
    })),
    
  submitShiftReport: (report) =>
    set((state) => ({
      shiftReports: [...state.shiftReports, report],
    })),
}));
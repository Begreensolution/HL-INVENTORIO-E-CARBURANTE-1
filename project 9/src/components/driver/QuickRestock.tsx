import React from 'react';
import { Package, Plus, AlertTriangle } from 'lucide-react';
import { useInventoryStore } from '../../store/inventoryStore';

export default function QuickRestock() {
  const { inventory } = useInventoryStore();
  const lowStockItems = inventory.filter(item => item.currentStock <= item.minimumStock);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Package className="w-6 h-6 text-blue-600" />
        Richiesta Rapida Rifornimenti
      </h2>

      <div className="space-y-4">
        {lowStockItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Scorta attuale: {item.currentStock} {item.unit}
                </p>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Richiedi
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
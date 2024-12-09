import React, { useState } from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { useUserStore } from '../store/userStore';
import { mockAmbulances } from '../data/mockAmbulances';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function Checklist() {
  const { inventory, submitShiftReport } = useInventoryStore();
  const { ambulanceId, driverId } = useUserStore();
  const [checklistItems, setChecklistItems] = useState<Record<string, any>>({});
  
  const ambulance = mockAmbulances.find(a => a.id === ambulanceId);
  
  const handleItemCheck = (itemId: string, status: string, quantity: number) => {
    setChecklistItems((prev) => ({
      ...prev,
      [itemId]: { status, quantity },
    }));
  };

  const handleSubmit = () => {
    const report = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      ambulanceId,
      driverId,
      checklist: Object.entries(checklistItems).map(([itemId, value]) => ({
        id: Date.now().toString(),
        itemId,
        ...value,
      })),
      notes: '',
      status: 'completed',
    };
    
    submitShiftReport(report);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="text-lg font-medium mb-2">Informazioni Ambulanza</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Codice:</p>
            <p className="font-medium">{ambulance?.code}</p>
          </div>
          <div>
            <p className="text-gray-600">Zona:</p>
            <p className="font-medium">{ambulance?.zone}</p>
          </div>
          <div>
            <p className="text-gray-600">Autista:</p>
            <p className="font-medium">{ambulance?.driver.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Matricola:</p>
            <p className="font-medium">{ambulance?.driver.badge}</p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checklist Fine Turno</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="space-y-6">
            {inventory.map((item) => (
              <div key={item.id} className="border-b pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Richiesto: {item.minimumStock} {item.unit}
                    </p>
                    <p className="text-sm text-gray-500">
                      Ubicazione: {item.location}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      className="w-20 px-3 py-2 border rounded-md"
                      placeholder="Qtà"
                      onChange={(e) =>
                        handleItemCheck(item.id, 'present', parseInt(e.target.value))
                      }
                    />
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleItemCheck(item.id, 'present', item.currentStock)}
                        className="p-2 rounded-full hover:bg-green-100"
                        title="Presente"
                      >
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      </button>
                      
                      <button
                        onClick={() => handleItemCheck(item.id, 'missing', 0)}
                        className="p-2 rounded-full hover:bg-red-100"
                        title="Mancante"
                      >
                        <XCircle className="w-6 h-6 text-red-500" />
                      </button>
                      
                      <button
                        onClick={() => handleItemCheck(item.id, 'low', item.currentStock)}
                        className="p-2 rounded-full hover:bg-yellow-100"
                        title="Scorta Bassa"
                      >
                        <AlertTriangle className="w-6 h-6 text-yellow-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Invia Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
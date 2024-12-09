import React, { useState } from 'react';
import { Fuel, TrendingUp, Calendar } from 'lucide-react';
import { mockFuelRecords } from '../../data/mockFuelData';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export default function FuelLog() {
  const [newRecord, setNewRecord] = useState({
    liters: '',
    cost: '',
    kilometers: '',
    notes: ''
  });

  const calculateEfficiency = (liters: number, kilometers: number) => {
    return ((liters / kilometers) * 100).toFixed(2);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Fuel className="w-6 h-6 text-blue-600" />
        Registro Carburante
      </h2>

      <div className="mb-6">
        <h3 className="font-medium mb-3">Nuovo Rifornimento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <input
            type="number"
            placeholder="Litri"
            className="p-2 border rounded-md"
            value={newRecord.liters}
            onChange={(e) => setNewRecord({ ...newRecord, liters: e.target.value })}
          />
          <input
            type="number"
            placeholder="Costo (€)"
            className="p-2 border rounded-md"
            value={newRecord.cost}
            onChange={(e) => setNewRecord({ ...newRecord, cost: e.target.value })}
          />
          <input
            type="number"
            placeholder="Chilometri"
            className="p-2 border rounded-md"
            value={newRecord.kilometers}
            onChange={(e) => setNewRecord({ ...newRecord, kilometers: e.target.value })}
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Registra
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-medium">Ultimi Rifornimenti</h3>
        {mockFuelRecords.map((record) => (
          <div key={record.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {format(new Date(record.date), 'PPP', { locale: it })}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Litri:</p>
                    <p className="font-medium">{record.liters} L</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Costo:</p>
                    <p className="font-medium">€{record.cost.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Chilometri:</p>
                    <p className="font-medium">{record.kilometers} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Consumo:</p>
                    <p className="font-medium">
                      {calculateEfficiency(record.liters, record.kilometers)} L/100km
                    </p>
                  </div>
                </div>
              </div>
              <TrendingUp className={`w-5 h-5 ${
                parseFloat(calculateEfficiency(record.liters, record.kilometers)) > 15
                  ? 'text-red-500'
                  : 'text-green-500'
              }`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
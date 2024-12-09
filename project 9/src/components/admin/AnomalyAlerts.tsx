import React from 'react';
import { AlertTriangle, TrendingUp, DollarSign, Clock, ArrowUp, ArrowDown, Fuel } from 'lucide-react';
import { useInventoryStore } from '../../store/inventoryStore';
import { mockFuelAnomalies } from '../../data/mockFuelData';

export default function AnomalyAlerts() {
  const { inventory } = useInventoryStore();

  // Calcola le anomalie di consumo
  const consumptionAnomalies = inventory.filter(item => {
    const consumptionRate = item.currentStock / item.minimumStock;
    return consumptionRate < 0.5 || consumptionRate > 2;
  });

  // Calcola le anomalie di costo
  const costAnomalies = inventory.filter(item => {
    const totalValue = item.currentStock * item.price;
    return totalValue > 1000 && item.currentStock > item.minimumStock * 2;
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <AlertTriangle className="w-6 h-6 text-red-500" />
        Sistema di Allerta Anomalie
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Anomalie di Consumo */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Anomalie di Consumo</h3>
          {consumptionAnomalies.map(item => (
            <div key={item.id} className="border rounded-lg p-4 bg-red-50">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Scorta: {item.currentStock}/{item.minimumStock} {item.unit}
                  </p>
                </div>
                {item.currentStock / item.minimumStock < 0.5 ? (
                  <ArrowDown className="w-5 h-5 text-red-500" />
                ) : (
                  <ArrowUp className="w-5 h-5 text-orange-500" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Anomalie di Costo */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Anomalie di Costo</h3>
          {costAnomalies.map(item => (
            <div key={item.id} className="border rounded-lg p-4 bg-yellow-50">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Valore totale: €{(item.currentStock * item.price).toFixed(2)}
                  </p>
                </div>
                <DollarSign className="w-5 h-5 text-yellow-500" />
              </div>
            </div>
          ))}
        </div>

        {/* Anomalie Carburante */}
        <div className="space-y-4">
          <h3 className="font-medium text-lg">Anomalie Carburante</h3>
          {mockFuelAnomalies.map(anomaly => (
            <div key={anomaly.id} className="border rounded-lg p-4 bg-orange-50">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{anomaly.description}</h4>
                  <p className="text-sm text-gray-600">
                    Ambulanza: {anomaly.ambulanceId}
                  </p>
                </div>
                <Fuel className="w-5 h-5 text-orange-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Suggerimenti AI */}
      <div className="mt-6 border-t pt-6">
        <h3 className="font-medium text-lg mb-4">Suggerimenti AI</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 bg-blue-50">
            <h4 className="font-medium text-blue-800">Ottimizzazione Scorte</h4>
            <p className="text-sm text-blue-600 mt-1">
              Si consiglia di rivedere le soglie minime per gli articoli con consumo anomalo.
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-green-50">
            <h4 className="font-medium text-green-800">Gestione Costi</h4>
            <p className="text-sm text-green-600 mt-1">
              Potenziale risparmio del 15% ottimizzando gli ordini di materiali ad alto valore.
            </p>
          </div>
          <div className="border rounded-lg p-4 bg-orange-50">
            <h4 className="font-medium text-orange-800">Consumi Carburante</h4>
            <p className="text-sm text-orange-600 mt-1">
              Analisi pattern di guida suggerisce possibilità di riduzione consumi del 10%.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
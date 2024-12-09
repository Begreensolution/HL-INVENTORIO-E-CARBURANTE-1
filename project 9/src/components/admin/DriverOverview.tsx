import React, { useState } from 'react';
import { Users, Calendar, TrendingUp, AlertTriangle, Car } from 'lucide-react';
import { mockAmbulances } from '../../data/mockAmbulances';
import { mockFuelRecords } from '../../data/mockFuelData';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export default function DriverOverview() {
  const [selectedDriver, setSelectedDriver] = useState(null);

  const getDriverStats = (driverId: string) => {
    const driverFuelRecords = mockFuelRecords.filter(record => record.driverId === driverId);
    const averageConsumption = driverFuelRecords.reduce((acc, record) => 
      acc + (record.liters / record.kilometers) * 100, 0) / driverFuelRecords.length;

    return {
      totalKilometers: driverFuelRecords.reduce((acc, record) => acc + record.kilometers, 0),
      averageConsumption: averageConsumption.toFixed(2),
      totalRefuels: driverFuelRecords.length,
      lastRefuel: driverFuelRecords[0]?.date
    };
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Users className="w-6 h-6 text-blue-600" />
        Panoramica Autisti
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockAmbulances.map((ambulance) => {
          const stats = getDriverStats(ambulance.driver.id);
          return (
            <div 
              key={ambulance.driver.id} 
              className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
              onClick={() => setSelectedDriver(ambulance.driver.id)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{ambulance.driver.name}</h3>
                  <p className="text-sm text-gray-600">Matricola: {ambulance.driver.badge}</p>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Ambulanza:</p>
                      <p className="font-medium">{ambulance.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Zona:</p>
                      <p className="font-medium">{ambulance.zone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Km Totali:</p>
                      <p className="font-medium">{stats.totalKilometers} km</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Consumo Medio:</p>
                      <p className="font-medium">{stats.averageConsumption} L/100km</p>
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  ambulance.status === 'active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {ambulance.status === 'active' ? 'In Servizio' : 'In Pausa'}
                </span>
              </div>

              {selectedDriver === ambulance.driver.id && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-3">Analisi AI</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span>Efficienza di guida superiore alla media del 5%</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span>Ottima puntualità nei turni</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Car className="w-4 h-4 text-yellow-500" />
                      <span>Suggerito corso di guida economica</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
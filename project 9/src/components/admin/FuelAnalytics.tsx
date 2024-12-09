import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Fuel, AlertTriangle, TrendingUp, User, Ambulance } from 'lucide-react';
import { mockFuelRecords, mockFuelAnomalies } from '../../data/mockFuelData';
import { mockAmbulances } from '../../data/mockAmbulances';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export default function FuelAnalytics() {
  const consumptionData = mockFuelRecords.map(record => ({
    date: format(new Date(record.date), 'dd/MM'),
    consumo: parseFloat(((record.liters / record.kilometers) * 100).toFixed(2)),
    costo: record.cost
  }));

  const getAmbulanceInfo = (ambulanceId: string) => {
    return mockAmbulances.find(amb => amb.id === ambulanceId);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Fuel className="w-6 h-6 text-blue-600" />
        Analisi Consumi Carburante
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Fuel className="w-6 h-6 text-blue-600" />
            <h3 className="font-medium">Consumo Medio</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            14.5 L/100km
          </p>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="font-medium">Anomalie Rilevate</h3>
          </div>
          <p className="text-2xl font-bold text-red-600 mt-2">
            {mockFuelAnomalies.length}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="font-medium">Trend Mensile</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">-2.3%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Andamento Consumi</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="consumo" 
                  stroke="#3B82F6" 
                  name="L/100km"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Costi Carburante</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="costo" fill="#10B981" name="Costo (€)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Anomalie Rilevate</h3>
        <div className="space-y-4">
          {mockFuelAnomalies.map((anomaly) => {
            const ambulance = getAmbulanceInfo(anomaly.ambulanceId);
            return (
              <div key={anomaly.id} className="border rounded-lg p-4 bg-red-50">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium">{anomaly.description}</h4>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <Ambulance className="w-4 h-4" />
                        Ambulanza: {ambulance?.code} - {ambulance?.zone}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Autista: {ambulance?.driver.name} (Matricola: {ambulance?.driver.badge})
                      </p>
                      <p className="text-sm text-gray-600">
                        Data: {format(new Date(anomaly.date), 'PPP', { locale: it })}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      anomaly.severity === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : anomaly.severity === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {anomaly.severity === 'high' ? 'Alta Gravità' : 
                       anomaly.severity === 'medium' ? 'Media Gravità' : 
                       'Bassa Gravità'}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      anomaly.status === 'new' 
                        ? 'bg-blue-100 text-blue-800'
                        : anomaly.status === 'investigating'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {anomaly.status === 'new' ? 'Nuova' :
                       anomaly.status === 'investigating' ? 'In Analisi' :
                       'Risolta'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
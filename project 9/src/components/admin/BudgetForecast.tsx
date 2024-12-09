import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, AlertTriangle, DollarSign } from 'lucide-react';

const forecastData = [
  { month: 'Gen', actual: 15000, forecast: 15500 },
  { month: 'Feb', actual: 16000, forecast: 16200 },
  { month: 'Mar', actual: 15500, forecast: 16000 },
  { month: 'Apr', actual: 16500, forecast: 17000 },
  { month: 'Mag', actual: null, forecast: 17500 },
  { month: 'Giu', actual: null, forecast: 18000 }
];

export default function BudgetForecast() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-blue-600" />
        Previsione Budget
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <h3 className="font-medium">Spesa Prevista</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">€18,000</p>
          <p className="text-sm text-blue-600">Prossimo mese</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            <h3 className="font-medium">Variazione Attesa</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">+5.2%</p>
          <p className="text-sm text-yellow-600">Rispetto al mese corrente</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="font-medium">Trend Annuale</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">+12.8%</p>
          <p className="text-sm text-green-600">Crescita prevista</p>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="#3B82F6" 
              name="Spesa Effettiva"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="forecast" 
              stroke="#10B981" 
              name="Previsione"
              strokeWidth={2}
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
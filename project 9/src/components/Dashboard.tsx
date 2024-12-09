import React from 'react';
import { useInventoryStore } from '../store/inventoryStore';
import { useUserStore } from '../store/userStore';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { AlertTriangle, TrendingUp, Package, Truck, DollarSign, Clock } from 'lucide-react';
import ShipmentsList from './ShipmentsList';
import LocationsList from './LocationsList';

export default function Dashboard() {
  const { inventory } = useInventoryStore();
  const { role } = useUserStore();

  const lowStockItems = inventory.filter(item => item.currentStock <= item.minimumStock);
  const totalValue = inventory.reduce((acc, item) => acc + (item.currentStock * item.price), 0);

  const categoryData = Object.entries(
    inventory.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.currentStock;
      return acc;
    }, {} as Record<string, number>)
  ).map(([name, value]) => ({ name, value }));

  const monthlyData = [
    { month: 'Gen', consumo: 1200 },
    { month: 'Feb', consumo: 1100 },
    { month: 'Mar', consumo: 1300 },
    { month: 'Apr', consumo: 1400 },
    { month: 'Mag', consumo: 1200 },
    { month: 'Giu', consumo: 1500 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-6">      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Scorte in Esaurimento</h3>
              <p className="text-2xl font-bold">{lowStockItems.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Package className="w-8 h-8 text-blue-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Totale Articoli</h3>
              <p className="text-2xl font-bold">{inventory.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Valore Totale</h3>
              <p className="text-2xl font-bold">€{totalValue.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-yellow-500 mr-3" />
            <div>
              <h3 className="text-lg font-semibold">Ordini in Corso</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Livelli Scorte per Categoria</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Trend Consumi Mensili</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="consumo" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Articoli in Esaurimento</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Articolo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scorta Attuale
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scorta Minima
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ubicazione
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lowStockItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-red-600">
                    {item.currentStock} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {item.minimumStock} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {item.location}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {role === 'admin' && (
        <div className="space-y-6">
          <ShipmentsList />
          <LocationsList />
        </div>
      )}
    </div>
  );
}
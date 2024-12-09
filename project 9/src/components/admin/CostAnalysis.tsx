import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useInventoryStore } from '../../store/inventoryStore';
import { DollarSign, TrendingUp, Package } from 'lucide-react';

const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];

export default function CostAnalysis() {
  const { inventory } = useInventoryStore();

  // Calcola i costi per categoria
  const costsByCategory = inventory.reduce((acc, item) => {
    const category = item.category === 'medication' ? 'Farmaci' :
                    item.category === 'equipment' ? 'Attrezzature' : 'Materiali';
    acc[category] = (acc[category] || 0) + (item.currentStock * item.price);
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(costsByCategory).map(([name, value]) => ({
    name,
    value: parseFloat(value.toFixed(2))
  }));

  // Dati mensili simulati
  const monthlyData = [
    { month: 'Gen', costi: 12500, budget: 15000 },
    { month: 'Feb', costi: 13200, budget: 15000 },
    { month: 'Mar', costi: 14800, budget: 15000 },
    { month: 'Apr', costi: 13900, budget: 15000 },
    { month: 'Mag', costi: 15200, budget: 15000 },
    { month: 'Giu', costi: 14100, budget: 15000 }
  ];

  const totalValue = inventory.reduce((acc, item) => acc + (item.currentStock * item.price), 0);
  const averageMonthlySpend = monthlyData.reduce((acc, month) => acc + month.costi, 0) / monthlyData.length;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Analisi dei Costi</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <h3 className="font-medium">Valore Totale Inventario</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            €{totalValue.toFixed(2)}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <h3 className="font-medium">Spesa Media Mensile</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">
            €{averageMonthlySpend.toFixed(2)}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-yellow-600" />
            <h3 className="font-medium">Categorie Gestite</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {Object.keys(costsByCategory).length}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Distribuzione Costi per Categoria</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Andamento Costi vs Budget</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="costi" fill="#3B82F6" name="Costi Effettivi" />
                <Bar dataKey="budget" fill="#10B981" name="Budget" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
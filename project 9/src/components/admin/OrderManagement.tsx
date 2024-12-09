import React from 'react';
import { Package, Truck, Clock, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: Array<{ name: string; quantity: number; unit: string }>;
  supplier: string;
  priority: 'low' | 'medium' | 'high';
  estimatedDelivery: string;
  totalCost: number;
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    date: '2024-03-15',
    status: 'processing',
    items: [
      { name: 'Garza sterile', quantity: 200, unit: 'pezzi' },
      { name: 'Guanti monouso', quantity: 1000, unit: 'pezzi' }
    ],
    supplier: 'MediSupply Italia',
    priority: 'high',
    estimatedDelivery: '2024-03-18',
    totalCost: 1250.00
  },
  {
    id: 'ORD002',
    date: '2024-03-14',
    status: 'shipped',
    items: [
      { name: 'Soluzione fisiologica', quantity: 50, unit: 'flaconi' },
      { name: 'Bendaggi', quantity: 100, unit: 'pezzi' }
    ],
    supplier: 'TechMed Equipment',
    priority: 'medium',
    estimatedDelivery: '2024-03-17',
    totalCost: 850.00
  }
];

export default function OrderManagement() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Package className="w-6 h-6 text-blue-600" />
        Gestione Ordini
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            <h3 className="font-medium">Ordini Attivi</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mt-2">
            {mockOrders.length}
          </p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Clock className="w-6 h-6 text-yellow-600" />
            <h3 className="font-medium">In Elaborazione</h3>
          </div>
          <p className="text-2xl font-bold text-yellow-600 mt-2">
            {mockOrders.filter(o => o.status === 'processing').length}
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <Truck className="w-6 h-6 text-green-600" />
            <h3 className="font-medium">In Consegna</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mt-2">
            {mockOrders.filter(o => o.status === 'shipped').length}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">Ordine #{order.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    order.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : order.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {order.priority === 'high' ? 'Alta Priorità' : 
                     order.priority === 'medium' ? 'Media Priorità' : 
                     'Bassa Priorità'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Data ordine: {format(new Date(order.date), 'PPP', { locale: it })}
                </p>
                <p className="text-sm text-gray-600">
                  Consegna prevista: {format(new Date(order.estimatedDelivery), 'PPP', { locale: it })}
                </p>
                <div className="mt-2">
                  <h4 className="text-sm font-medium mb-1">Articoli:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity} {item.unit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {order.status === 'delivered' ? 'Consegnato' :
                   order.status === 'shipped' ? 'In Transito' :
                   order.status === 'processing' ? 'In Elaborazione' :
                   'In Attesa'}
                </div>
                <p className="mt-2 text-lg font-medium">
                  €{order.totalCost.toFixed(2)}
                </p>
                <p className="text-sm text-gray-600">
                  {order.supplier}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
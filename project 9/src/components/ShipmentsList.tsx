import React from 'react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Truck, Package, AlertCircle } from 'lucide-react';
import { mockShipments } from '../data/mockLocations';
import { useInventoryStore } from '../store/inventoryStore';

export default function ShipmentsList() {
  const { inventory } = useInventoryStore();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shipped': return 'text-blue-600';
      case 'delivered': return 'text-green-600';
      case 'processing': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shipped': return <Truck className="w-5 h-5" />;
      case 'delivered': return <Package className="w-5 h-5" />;
      case 'processing': return <AlertCircle className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Spedizioni in Corso</h2>
      <div className="space-y-4">
        {mockShipments.map((shipment) => (
          <div key={shipment.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  <span className={getStatusColor(shipment.status)}>
                    {getStatusIcon(shipment.status)}
                  </span>
                  <span className="font-medium">
                    Tracking: {shipment.trackingNumber}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Consegna prevista: {format(new Date(shipment.estimatedDelivery), 'PPP', { locale: it })}
                </p>
                <div className="mt-2">
                  <h4 className="text-sm font-medium">Articoli:</h4>
                  <ul className="text-sm text-gray-600">
                    {shipment.items.map(({ itemId, quantity }) => {
                      const item = inventory.find(i => i.id === itemId);
                      return (
                        <li key={itemId}>
                          {item?.name} - {quantity} {item?.unit}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                shipment.priority === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : shipment.priority === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {shipment.priority === 'high' ? 'Alta Priorità' : 
                 shipment.priority === 'medium' ? 'Media Priorità' : 
                 'Bassa Priorità'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
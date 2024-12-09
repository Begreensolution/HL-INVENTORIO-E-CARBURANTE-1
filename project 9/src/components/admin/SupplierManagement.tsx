import React from 'react';
import { Building2, Phone, Mail, Package } from 'lucide-react';

const suppliers = [
  {
    id: 1,
    name: 'MediSupply Italia',
    contact: 'Mario Rossi',
    email: 'mario.rossi@medisupply.it',
    phone: '+39 02 1234567',
    category: 'Farmaci',
    rating: 4.8,
    lastOrder: '2024-03-01'
  },
  {
    id: 2,
    name: 'TechMed Equipment',
    contact: 'Laura Bianchi',
    email: 'l.bianchi@techmed.it',
    phone: '+39 02 7654321',
    category: 'Attrezzature',
    rating: 4.5,
    lastOrder: '2024-02-28'
  }
];

export default function SupplierManagement() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Building2 className="w-6 h-6 text-blue-600" />
        Gestione Fornitori
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {suppliers.map((supplier) => (
          <div key={supplier.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{supplier.name}</h3>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    {supplier.category}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {supplier.phone}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {supplier.email}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Rating: {supplier.rating}/5
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  Ultimo ordine: {supplier.lastOrder}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { MapPin, Phone, User } from 'lucide-react';
import { mockLocations } from '../data/mockLocations';

export default function LocationsList() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Sedi e Magazzini</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockLocations.map((location) => (
          <div key={location.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">{location.name}</h3>
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{location.address}, {location.city} ({location.province})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{location.contact}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{location.phone}</span>
                  </div>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                location.type === 'hospital' 
                  ? 'bg-red-100 text-red-800' 
                  : location.type === 'warehouse'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-green-100 text-green-800'
              }`}>
                {location.type === 'hospital' ? 'Ospedale' : 
                 location.type === 'warehouse' ? 'Magazzino' : 
                 'Stazione'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
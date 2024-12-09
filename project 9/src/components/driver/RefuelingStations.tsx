import React from 'react';
import { MapPin, Fuel, Phone, Clock } from 'lucide-react';

interface RefuelingStation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  fuelTypes: string[];
  lastPrice: number;
  distance: number;
  isOpen: boolean;
}

const mockStations: RefuelingStation[] = [
  {
    id: '1',
    name: 'Stazione Q8',
    address: 'Via Roma, 123',
    city: 'Milano',
    phone: '+39 02 1234567',
    hours: '06:00-22:00',
    fuelTypes: ['Diesel', 'Benzina'],
    lastPrice: 1.85,
    distance: 2.5,
    isOpen: true
  },
  {
    id: '2',
    name: 'ENI Station',
    address: 'Corso Italia, 45',
    city: 'Milano',
    phone: '+39 02 7654321',
    hours: '24h',
    fuelTypes: ['Diesel', 'Benzina', 'Metano'],
    lastPrice: 1.82,
    distance: 3.8,
    isOpen: true
  }
];

export default function RefuelingStations() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Fuel className="w-6 h-6 text-blue-600" />
        Stazioni di Rifornimento
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockStations.map((station) => (
          <div key={station.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{station.name}</h3>
                <div className="mt-2 space-y-2">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {station.address}, {station.city} ({station.distance} km)
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {station.phone}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {station.hours}
                  </p>
                  <div className="flex items-center gap-2">
                    <Fuel className="w-4 h-4 text-gray-600" />
                    <div className="flex gap-2">
                      {station.fuelTypes.map((type, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-700"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${
                  station.isOpen ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {station.isOpen ? 'Aperto' : 'Chiuso'}
                </span>
                <p className="mt-2 text-lg font-medium">
                  €{station.lastPrice.toFixed(2)}/L
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
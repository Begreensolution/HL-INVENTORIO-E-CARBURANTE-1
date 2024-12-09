import React from 'react';
import { Ambulance as AmbulanceIcon } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { mockAmbulances } from '../data/mockAmbulances';

export default function Header() {
  const { role, ambulanceId } = useUserStore();
  const ambulance = mockAmbulances.find(a => a.id === ambulanceId);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <AmbulanceIcon className="w-8 h-8 sm:w-10 sm:h-10" />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">QUANTUM TECH INVENTARIO PER HL</h1>
              <p className="text-xs sm:text-sm opacity-80">di Maurizio Tarricone</p>
            </div>
          </div>
          {role === 'driver' && ambulance && (
            <div className="w-full sm:w-auto">
              <div className="bg-blue-700 px-4 py-2 rounded-lg text-center sm:text-right">
                <p className="font-medium">{ambulance.code}</p>
                <p className="text-sm opacity-80">Zona: {ambulance.zone}</p>
                <p className="text-sm opacity-80">Autista: {ambulance.driver.name}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
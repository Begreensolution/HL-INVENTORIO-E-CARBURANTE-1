import React, { useState } from 'react';
import { Tool, Calendar, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export default function MaintenanceLog() {
  const [newIssue, setNewIssue] = useState('');
  
  const maintenanceItems = [
    {
      id: 1,
      date: new Date(),
      type: 'Controllo',
      description: 'Pressione pneumatici',
      status: 'completed'
    },
    {
      id: 2,
      date: new Date(),
      type: 'Manutenzione',
      description: 'Cambio olio',
      status: 'pending'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Tool className="w-6 h-6 text-blue-600" />
        Registro Manutenzione
      </h2>

      <div className="space-y-4">
        {maintenanceItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {format(item.date, 'PPP', { locale: it })}
                  </span>
                </div>
                <h3 className="font-medium mt-1">{item.description}</h3>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs mt-2 ${
                  item.status === 'completed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {item.status === 'completed' ? 'Completato' : 'In Attesa'}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Segnala un nuovo problema..."
              className="flex-1 p-2 border rounded-md"
              value={newIssue}
              onChange={(e) => setNewIssue(e.target.value)}
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Segnala
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
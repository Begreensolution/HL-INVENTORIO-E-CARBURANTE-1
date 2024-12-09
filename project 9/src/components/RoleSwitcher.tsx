import React from 'react';
import { useUserStore } from '../store/userStore';
import { UserRole } from '../types/user';
import { Users } from 'lucide-react';

export default function RoleSwitcher() {
  const { role, setRole } = useUserStore();

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Users className="w-5 h-5" />
          <span className="font-medium">Cambia Ruolo</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleRoleChange('driver')}
            className={`px-4 py-2 rounded-md ${
              role === 'driver'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Autista
          </button>
          <button
            onClick={() => handleRoleChange('admin')}
            className={`px-4 py-2 rounded-md ${
              role === 'admin'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Amministratore
          </button>
        </div>
      </div>
    </div>
  );
}
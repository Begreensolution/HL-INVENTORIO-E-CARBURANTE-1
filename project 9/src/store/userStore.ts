import { create } from 'zustand';
import { UserRole } from '../types/user';
import { mockAmbulances } from '../data/mockAmbulances';

interface UserStore {
  role: UserRole;
  ambulanceId: string | null;
  driverId: string | null;
  setRole: (role: UserRole) => void;
  setAmbulance: (ambulanceId: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  role: 'driver',
  ambulanceId: '1',
  driverId: mockAmbulances[0].driver.id,
  setRole: (role) => set({ role }),
  setAmbulance: (ambulanceId) => {
    const ambulance = mockAmbulances.find(a => a.id === ambulanceId);
    set({ 
      ambulanceId,
      driverId: ambulance?.driver.id || null
    });
  }
}));
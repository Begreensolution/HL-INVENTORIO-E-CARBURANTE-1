import { Ambulance } from '../types/ambulance';

export const mockAmbulances: Ambulance[] = [
  {
    id: '1',
    code: 'AMB-MI-001',
    zone: 'Milano Nord',
    driver: {
      id: 'D001',
      name: 'Marco Rossi',
      badge: 'MR118'
    },
    status: 'active',
    baseLocation: '1'
  },
  {
    id: '2',
    code: 'AMB-MI-002',
    zone: 'Milano Sud',
    driver: {
      id: 'D002',
      name: 'Laura Bianchi',
      badge: 'LB118'
    },
    status: 'active',
    baseLocation: '1'
  },
  {
    id: '3',
    code: 'AMB-RM-001',
    zone: 'Roma Est',
    driver: {
      id: 'D003',
      name: 'Giuseppe Verdi',
      badge: 'GV118'
    },
    status: 'active',
    baseLocation: '3'
  }
];
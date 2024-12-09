export interface Ambulance {
  id: string;
  code: string;
  zone: string;
  driver: {
    id: string;
    name: string;
    badge: string;
  };
  status: 'active' | 'maintenance' | 'standby';
  baseLocation: string;
}
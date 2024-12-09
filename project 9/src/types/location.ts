export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  type: 'warehouse' | 'hospital' | 'station';
  contact: string;
  phone: string;
}

export interface Shipment {
  id: string;
  orderDate: string;
  estimatedDelivery: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  items: Array<{
    itemId: string;
    quantity: number;
  }>;
  fromLocation: string;
  toLocation: string;
  trackingNumber: string;
  priority: 'low' | 'medium' | 'high';
}
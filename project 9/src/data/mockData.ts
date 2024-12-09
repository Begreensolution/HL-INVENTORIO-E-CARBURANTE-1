import { InventoryItem } from '../types/inventory';

export const mockInventory: InventoryItem[] = [
  {
    id: '1',
    name: 'Garza sterile',
    category: 'supplies',
    currentStock: 50,
    minimumStock: 30,
    unit: 'pezzi',
    location: 'Cassetto A1',
    price: 0.5,
    expiryDate: '2025-12-31'
  },
  {
    id: '2',
    name: 'Soluzione fisiologica',
    category: 'medication',
    currentStock: 15,
    minimumStock: 20,
    unit: 'flaconi',
    location: 'Armadietto B2',
    price: 2.5,
    expiryDate: '2024-12-31'
  },
  {
    id: '3',
    name: 'Guanti monouso',
    category: 'supplies',
    currentStock: 200,
    minimumStock: 100,
    unit: 'pezzi',
    location: 'Cassetto A2',
    price: 0.2
  },
  {
    id: '4',
    name: 'Adrenalina',
    category: 'medication',
    currentStock: 5,
    minimumStock: 10,
    unit: 'fiale',
    location: 'Cassaforte C1',
    price: 15.0,
    expiryDate: '2024-06-30'
  },
  {
    id: '5',
    name: 'Defibrillatore',
    category: 'equipment',
    currentStock: 1,
    minimumStock: 1,
    unit: 'pezzo',
    location: 'Vano principale',
    price: 2000.0
  },
  {
    id: '6',
    name: 'Morfina',
    category: 'medication',
    currentStock: 8,
    minimumStock: 15,
    unit: 'fiale',
    location: 'Cassaforte C1',
    price: 25.0,
    expiryDate: '2024-08-30'
  },
  {
    id: '7',
    name: 'Bendaggi elastici',
    category: 'supplies',
    currentStock: 40,
    minimumStock: 25,
    unit: 'pezzi',
    location: 'Cassetto A3',
    price: 1.5
  },
  {
    id: '8',
    name: 'Maschere ossigeno',
    category: 'equipment',
    currentStock: 12,
    minimumStock: 10,
    unit: 'pezzi',
    location: 'Armadietto B1',
    price: 8.0
  },
  {
    id: '9',
    name: 'Aspiratore',
    category: 'equipment',
    currentStock: 2,
    minimumStock: 2,
    unit: 'pezzi',
    location: 'Vano principale',
    price: 450.0
  },
  {
    id: '10',
    name: 'Lacci emostatici',
    category: 'supplies',
    currentStock: 15,
    minimumStock: 20,
    unit: 'pezzi',
    location: 'Cassetto A4',
    price: 5.0
  },
  // Aggiunti nuovi prodotti
  {
    id: '11',
    name: 'Paracetamolo',
    category: 'medication',
    currentStock: 25,
    minimumStock: 20,
    unit: 'compresse',
    location: 'Armadietto B3',
    price: 3.0,
    expiryDate: '2025-01-31'
  },
  {
    id: '12',
    name: 'Saturimetro',
    category: 'equipment',
    currentStock: 3,
    minimumStock: 3,
    unit: 'pezzi',
    location: 'Vano principale',
    price: 80.0
  },
  {
    id: '13',
    name: 'Cerotti',
    category: 'supplies',
    currentStock: 150,
    minimumStock: 100,
    unit: 'pezzi',
    location: 'Cassetto A1',
    price: 0.1
  },
  {
    id: '14',
    name: 'Siringhe sterili',
    category: 'supplies',
    currentStock: 180,
    minimumStock: 150,
    unit: 'pezzi',
    location: 'Cassetto A5',
    price: 0.3
  },
  {
    id: '15',
    name: 'Diazepam',
    category: 'medication',
    currentStock: 10,
    minimumStock: 15,
    unit: 'fiale',
    location: 'Cassaforte C1',
    price: 18.0,
    expiryDate: '2024-09-30'
  }
];
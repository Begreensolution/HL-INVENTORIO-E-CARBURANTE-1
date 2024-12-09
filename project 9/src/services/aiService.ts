import { Configuration, OpenAIApi } from 'openai';
import { AssistantType, AIResponse } from '../types/ai';
import { useInventoryStore } from '../store/inventoryStore';
import { mockShipments } from '../data/mockLocations';
import { mockFuelRecords, mockFuelAnomalies } from '../data/mockFuelData';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

const configuration = new Configuration({
  apiKey: 'sk-proj-aZ8_2wnOES4vEOs7jajOxTHfB8cKLIgm3ebBXfDMh-RL0JgismbBK3kLS5MMpG5aFJRGXqAkY5T3BlbkFJ8Zm5Z3GKRvw8EvQYoMVJwQAc8GVdr6wZQthE-QYIqC6B6siYi48-UlkRo3O1-M2ciHPijiYiMAFAI'
});

const openai = new OpenAIApi(configuration);

export const getAIResponse = async (input: string, type: AssistantType, role: 'driver' | 'admin'): Promise<AIResponse> => {
  try {
    // Get current state without hooks since we're outside React components
    const inventory = useInventoryStore.getState().inventory;
    
    // Prepare context based on type and role
    let contextData = {
      inventory,
      shipments: mockShipments,
      fuelData: mockFuelRecords,
      anomalies: mockFuelAnomalies,
      role
    };

    // Generate response based on type without calling OpenAI API
    let response: AIResponse = {
      type,
      text: 'Mi dispiace, non ho potuto elaborare la richiesta.',
      data: null
    };

    switch (type) {
      case 'inventory':
        response = processInventoryQuery(input, contextData);
        break;
      case 'shipping':
        response = processShippingQuery(input, contextData);
        break;
      case 'analytics':
        response = processAnalyticsQuery(input, contextData);
        break;
      case 'checklist':
        response = processChecklistQuery(input, contextData);
        break;
    }

    return response;
  } catch (error) {
    console.error('Error getting AI response:', error);
    return {
      type,
      text: 'Mi dispiace, si è verificato un errore. Riprova più tardi.',
      data: null
    };
  }
};

const processInventoryQuery = (input: string, context: any): AIResponse => {
  const lowStockItems = context.inventory.filter(item => item.currentStock <= item.minimumStock);
  
  if (input.toLowerCase().includes('scorte')) {
    return {
      type: 'inventory',
      text: `Ci sono ${lowStockItems.length} articoli in esaurimento. Gli articoli più critici sono: ${
        lowStockItems.slice(0, 3).map(item => item.name).join(', ')
      }`,
      data: { lowStockItems }
    };
  }

  return {
    type: 'inventory',
    text: 'Posso aiutarti con la gestione dell\'inventario. Cosa ti serve sapere?',
    data: { inventory: context.inventory }
  };
};

const processShippingQuery = (input: string, context: any): AIResponse => {
  const activeShipments = context.shipments.filter(s => s.status !== 'delivered');
  
  if (input.toLowerCase().includes('spedizion')) {
    return {
      type: 'shipping',
      text: `Ci sono ${activeShipments.length} spedizioni attive. ${
        activeShipments.map(s => `Spedizione ${s.trackingNumber}: ${s.status}`).join('. ')
      }`,
      data: { activeShipments }
    };
  }

  return {
    type: 'shipping',
    text: 'Posso aiutarti con le informazioni sulle spedizioni. Cosa vuoi sapere?',
    data: { shipments: context.shipments }
  };
};

const processAnalyticsQuery = (input: string, context: any): AIResponse => {
  if (context.role !== 'admin') {
    return {
      type: 'analytics',
      text: 'Mi dispiace, le analisi dettagliate sono disponibili solo per gli amministratori.',
      data: null
    };
  }

  if (input.toLowerCase().includes('costi')) {
    const totalCost = context.inventory.reduce((acc: number, item: any) => 
      acc + (item.currentStock * item.price), 0);
    
    return {
      type: 'analytics',
      text: `Il valore totale dell'inventario è €${totalCost.toFixed(2)}. La categoria con maggior impatto è...`,
      data: { totalCost, inventory: context.inventory }
    };
  }

  return {
    type: 'analytics',
    text: 'Posso aiutarti con l\'analisi dei dati. Quale aspetto ti interessa?',
    data: { analytics: context }
  };
};

const processChecklistQuery = (input: string, context: any): AIResponse => {
  if (context.role !== 'driver') {
    return {
      type: 'checklist',
      text: 'La compilazione delle checklist è riservata agli autisti.',
      data: null
    };
  }

  const requiredItems = context.inventory.filter((i: any) => i.minimumStock > 0);
  
  if (input.toLowerCase().includes('obbligator')) {
    return {
      type: 'checklist',
      text: `Gli articoli obbligatori sono: ${
        requiredItems.slice(0, 5).map((i: any) => i.name).join(', ')
      }...`,
      data: { requiredItems }
    };
  }

  return {
    type: 'checklist',
    text: 'Posso aiutarti con la compilazione della checklist. Cosa ti serve sapere?',
    data: { checklist: requiredItems }
  };
};
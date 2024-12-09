export type AssistantType = 'inventory' | 'shipping' | 'analytics' | 'checklist';

export interface AIResponse {
  text: string;
  type: AssistantType;
  data?: any;
}

export interface Message {
  text: string;
  isUser: boolean;
  type?: AssistantType;
  timestamp: string;
  data?: any;
}

export interface QuickSuggestion {
  text: string;
  action: string;
}
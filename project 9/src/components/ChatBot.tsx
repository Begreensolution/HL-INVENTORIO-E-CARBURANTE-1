import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, BarChart2, Truck, Package, ClipboardList, Bot, X } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { getAIResponse } from '../services/aiService';
import { Message, AssistantType } from '../types/ai';
import { format } from 'date-fns';
import { it } from 'date-fns/locale';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeType, setActiveType] = useState<AssistantType>('inventory');
  const { role } = useUserStore();
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const assistants = [
    { type: 'inventory' as AssistantType, icon: Package, label: 'Inventario' },
    { type: 'shipping' as AssistantType, icon: Truck, label: 'Spedizioni' },
    { type: 'analytics' as AssistantType, icon: BarChart2, label: 'Analisi' },
    { type: 'checklist' as AssistantType, icon: ClipboardList, label: 'Checklist' }
  ];

  const quickSuggestions = {
    inventory: ['Scorte in esaurimento?', 'Dove trovo le garze?'],
    shipping: ['Stato spedizioni', 'Prossime consegne'],
    analytics: ['Analisi costi', 'Previsioni consumi'],
    checklist: ['Come compilo la checklist?', 'Articoli obbligatori']
  };

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClose = () => {
    setIsOpen(false);
    setMessages([]);
    setInput('');
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await getAIResponse(input, activeType, role);
      const aiMessage: Message = {
        text: response.text,
        isUser: false,
        type: response.type,
        timestamp: new Date().toISOString(),
        data: response.data
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        text: 'Mi dispiace, si è verificato un errore. Riprova più tardi.',
        isUser: false,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('chat-overlay')) {
      handleClose();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 md:bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Apri chat"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 chat-overlay flex items-center justify-center md:items-end md:justify-end md:p-4"
          onClick={handleClickOutside}
        >
          <div 
            className="bg-white w-full h-full md:w-96 md:h-[600px] md:rounded-lg shadow-xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white md:rounded-t-lg">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  <h3 className="font-semibold">
                    Assistente IA - {assistants.find(a => a.type === activeType)?.label}
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="text-white hover:text-gray-200 transition-colors p-1"
                  aria-label="Chiudi chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {assistants.map(({ type, icon: Icon, label }) => (
                  <button
                    key={type}
                    onClick={() => setActiveType(type)}
                    className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                      activeType === type
                        ? 'bg-white text-blue-600'
                        : 'bg-blue-700 text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {format(new Date(message.timestamp), 'HH:mm', { locale: it })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {quickSuggestions[activeType].map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInput(suggestion)}
                      className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSend}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    aria-label="Invia messaggio"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
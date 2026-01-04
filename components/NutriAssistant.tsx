
import React, { useState, useRef, useEffect } from 'react';
import { getNutriAssistantResponse } from '../services/gemini';
import { Message } from '../types';

interface NutriAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const NutriAssistant: React.FC<NutriAssistantProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I am your Royal Harvest Nutri-Assistant. Looking for healthy snacks or a special gift in Edmonton? Ask me anything!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await getNutriAssistantResponse(input, messages);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I hit a snag. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b border-amber-50 bg-amber-50/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-800 rounded-full flex items-center justify-center text-white text-lg">
              <i className="fas fa-magic"></i>
            </div>
            <div>
              <h3 className="font-bold text-amber-950">Nutri-Assistant</h3>
              <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-amber-100 rounded-full text-amber-900 transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fdfbf7]">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-amber-800 text-white rounded-tr-none' 
                  : 'bg-white text-amber-950 shadow-sm border border-amber-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100 rounded-tl-none">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-amber-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-1.5 h-1.5 bg-amber-800 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-6 border-t border-amber-50 bg-white">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about brain health, gifting..."
              className="w-full pl-4 pr-12 py-3 bg-amber-50 border-none rounded-xl focus:ring-2 focus:ring-amber-800 text-amber-950 placeholder-amber-400 text-sm"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 bottom-2 w-10 bg-amber-800 text-white rounded-lg flex items-center justify-center hover:bg-amber-900 transition-colors disabled:opacity-50"
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </div>
          <p className="text-[10px] text-center text-amber-400 mt-4">
            AI can make mistakes. Always consult a nutritionist for medical advice.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NutriAssistant;

import React from 'react';
import { User, Bot, AlertTriangle } from 'lucide-react';

const ChatMessage = ({ message, isUser, isEscalated, category, timestamp }) => {
  return (
    <div className={`flex gap-3 p-4 chat-message ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="flex-shrink-0">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
            isEscalated ? 'bg-orange-100 text-orange-600 animate-pulse-glow' : 'bg-blue-100 text-blue-600'
          }`}>
            {isEscalated ? <AlertTriangle size={16} /> : <Bot size={16} />}
          </div>
        </div>
      )}
      
      <div className={`max-w-[70%] ${isUser ? 'order-first' : ''}`}>
        <div className={`rounded-lg p-3 transition-all duration-300 hover:shadow-md ${
          isUser 
            ? 'bg-blue-600 text-white ml-auto hover:bg-blue-700' 
            : isEscalated 
              ? 'bg-orange-50 border border-orange-200 hover:bg-orange-100' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
        }`}>
          {!isUser && category && (
            <div className="text-xs font-medium text-gray-500 mb-1 animate-fade-in">
              {isEscalated ? (
                <span className="flex items-center gap-1">
                  <AlertTriangle size={12} />
                  Escalating to Human Agent
                </span>
              ) : (
                `Category: ${category}`
              )}
            </div>
          )}
          <div className="whitespace-pre-wrap leading-relaxed">{message}</div>
          {timestamp && (
            <div className={`text-xs mt-2 opacity-70 ${
              isUser ? 'text-blue-100' : 'text-gray-500'
            }`}>
              {timestamp.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
      
      {isUser && (
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors duration-200">
            <User size={16} className="text-gray-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;


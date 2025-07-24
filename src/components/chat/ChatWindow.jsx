import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage.jsx';
import ChatInput from './ChatInput.jsx';
import LoadingSpinner from '../ui/LoadingSpinner.jsx';
import StatusBadge from '../ui/StatusBadge.jsx';
import aiService from '../../utils/aiService.js';
import { MessageSquare, Phone, Mail, Wifi, Users } from 'lucide-react';

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      message: "AI Assistant Response: Hello! I'm your SmartHome+ AI support assistant. I'm here to help you with any questions about your AI-powered home automation system. How can I assist you today?",
      isUser: false,
      category: 'General',
      timestamp: new Date(),
      isEscalated: false
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate online status
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (messageText) => {
    const userMessage = {
      id: Date.now(),
      message: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const aiResponse = await aiService.generateResponse(messageText);
      
      const assistantMessage = {
        id: Date.now() + 1,
        message: aiResponse.response,
        isUser: false,
        category: aiResponse.category,
        timestamp: new Date(),
        isEscalated: aiResponse.shouldEscalate
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage = {
        id: Date.now() + 1,
        message: "AI Assistant Response: I apologize, but I'm experiencing technical difficulties. Please try again in a moment, or contact our human support team for immediate assistance.",
        isUser: false,
        category: 'Error',
        timestamp: new Date(),
        isEscalated: false
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg overflow-hidden hover-lift">
      {/* Header */}
      <div className="gradient-bg-blue text-white p-4 flex items-center gap-3">
        <div className="relative">
          <MessageSquare size={24} />
          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
            isOnline ? 'bg-green-400' : 'bg-red-400'
          } animate-pulse`}></div>
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-semibold">SmartHome+ Support</h2>
          <div className="flex items-center gap-2 text-blue-100 text-sm">
            <Wifi size={12} />
            <span>AI-Powered Customer Assistant</span>
            <StatusBadge status={isOnline ? 'online' : 'offline'}>
              {isOnline ? 'Online' : 'Offline'}
            </StatusBadge>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-110">
            <Phone size={16} />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-110">
            <Mail size={16} />
          </button>
          <button className="p-2 hover:bg-blue-700 rounded-lg transition-all duration-200 hover:scale-110">
            <Users size={16} />
          </button>
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-blue-50 px-4 py-2 border-b flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-blue-700">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>AI Assistant Active • Response Time: ~2s</span>
        </div>
        <div className="text-gray-500">
          {messages.length - 1} messages today
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto bg-gray-50 custom-scrollbar">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.message}
            isUser={message.isUser}
            isEscalated={message.isEscalated}
            category={message.category}
            timestamp={message.timestamp}
          />
        ))}
        {isLoading && (
          <div className="flex gap-3 p-4 animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <LoadingSpinner size="sm" color="blue" />
            </div>
            <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
              <LoadingSpinner size="sm" color="gray" />
              <div className="text-gray-500">AI Assistant is analyzing your query...</div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatWindow;


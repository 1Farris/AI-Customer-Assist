import React, { useState } from 'react';
import ChatWindow from './components/chat/ChatWindow.jsx';
import SupportDashboard from './components/support/SupportDashboard.jsx';
import { MessageSquare, BarChart3, Settings, Home, Menu, X } from 'lucide-react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'chat', label: 'Customer Chat', icon: MessageSquare },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatWindow />;
      case 'dashboard':
        return <SupportDashboard />;
      case 'settings':
        return (
          <div className="settings">
            <h2>Settings</h2>
            <div className="settings-group">
              <label>OpenAI API Key</label>
              <input type="password" placeholder="Enter your OpenAI API key" />
              <p>Set as VITE_OPENAI_API_KEY environment variable.</p>

              <label>Response Temperature</label>
              <input type="range" min="0" max="1" step="0.1" defaultValue="0.7" />

              <label>
                <input type="checkbox" defaultChecked />
                Enable automatic escalation detection
              </label>

              <label>
                <input type="checkbox" defaultChecked />
                Enable real-time analytics
              </label>
            </div>
          </div>
        );
      default:
        return <ChatWindow />;
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="brand">
          <Home className="icon" />
          <div>
            <h1>SmartHome+</h1>
            <p>AI Customer Support System</p>
          </div>
        </div>

        <nav className="nav desktop-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="mobile-menu-btn">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`nav-button ${activeTab === tab.id ? 'active' : ''}`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}

      <main className="main-content">
        {renderContent()}
      </main>

      <footer className="footer">
        <p>© 2024 TechEase Innovations - SmartHome+ AI Support System</p>
        <p>Powered by OpenAI GPT-4 & Prompt Engineering</p>
      </footer>
    </div>
  );
}

export default App;

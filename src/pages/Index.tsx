// Update this page (the content is just a fallback if you fail to update the page)

import React, { useState, useEffect } from 'react';
import Calculator from '../components/Calculator';
import Settings from './Settings';

const Index = () => {
  const [showSettings, setShowSettings] = useState(false);

  // Initialize theme on app load
  useEffect(() => {
    const savedTheme = localStorage.getItem('calculatorTheme') || 'dark';
    const root = document.documentElement;
    
    if (savedTheme === 'green') {
      root.classList.add('green-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('green-theme');
    }
  }, []);

  const handleOpenSettings = () => {
    setShowSettings(true);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  if (showSettings) {
    return (
      <div>
        <Settings />
        <button
          onClick={handleCloseSettings}
          className="fixed top-4 right-4 bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-lg z-50"
        >
          Back to Calculator
        </button>
      </div>
    );
  }

  return <Calculator onOpenSettings={handleOpenSettings} />;
};

export default Index;

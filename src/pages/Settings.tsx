import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Palette, Layers } from 'lucide-react';

type Theme = 'dark' | 'green';
type Mode = 'basic' | 'medium' | 'advance';

const Settings = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mode, setMode] = useState<Mode>('medium');

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedTheme = (localStorage.getItem('calculatorTheme') as Theme) || 'dark';
    const savedMode = (localStorage.getItem('calculatorMode') as Mode) || 'medium';
    setTheme(savedTheme);
    setMode(savedMode);
  }, []);

  // Save theme to localStorage and apply it
  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('calculatorTheme', newTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    if (newTheme === 'green') {
      root.classList.add('green-theme');
      root.classList.remove('dark-theme');
    } else {
      root.classList.add('dark-theme');
      root.classList.remove('green-theme');
    }
  };

  // Save mode to localStorage
  const handleModeChange = (newMode: Mode) => {
    setMode(newMode);
    localStorage.setItem('calculatorMode', newMode);
    // Trigger a custom event to notify other components
    window.dispatchEvent(new CustomEvent('calculatorModeChanged', { detail: newMode }));
  };

  const getModeDescription = (selectedMode: Mode): string => {
    switch (selectedMode) {
      case 'basic':
        return 'Access to Basic and Scientific calculators only';
      case 'medium':
        return 'Access to Basic, Scientific, Matrix, and Graph calculators';
      case 'advance':
        return 'All features including advanced graphing and custom tools (Coming Soon)';
      default:
        return '';
    }
  };

  const getAvailableFeatures = (selectedMode: Mode): string[] => {
    switch (selectedMode) {
      case 'basic':
        return ['Basic Calculator', 'Scientific Calculator'];
      case 'medium':
        return ['Basic Calculator', 'Scientific Calculator', 'Matrix Calculator', 'Graph Plotter'];
      case 'advance':
        return ['Basic Calculator', 'Scientific Calculator', 'Matrix Calculator', 'Graph Plotter', 'Advanced Analytics', 'Custom Functions', '3D Plotting'];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <SettingsIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Theme Settings */}
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Theme Settings</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">Choose your preferred color theme</p>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Dark Theme */}
                <div
                  onClick={() => handleThemeChange('dark')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    theme === 'dark'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                    <span className="font-medium">Dark Theme</span>
                    {theme === 'dark' && <span className="text-primary text-sm">✓</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">Classic dark mode with blue accents</p>
                </div>

                {/* Green Theme */}
                <div
                  onClick={() => handleThemeChange('green')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    theme === 'green'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                    <span className="font-medium">Green Theme</span>
                    {theme === 'green' && <span className="text-primary text-sm">✓</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">Fresh green theme with nature accents</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mode Settings */}
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold text-foreground">Calculator Mode</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-muted-foreground">Select which calculator features you want to access</p>
              
              <div className="space-y-4">
                {/* Basic Mode */}
                <div
                  onClick={() => handleModeChange('basic')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    mode === 'basic'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-lg">Basic Mode</span>
                      {mode === 'basic' && <span className="text-primary">✓</span>}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">Beginner</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{getModeDescription('basic')}</p>
                  <div className="flex flex-wrap gap-2">
                    {getAvailableFeatures('basic').map((feature, idx) => (
                      <span key={idx} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Medium Mode */}
                <div
                  onClick={() => handleModeChange('medium')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    mode === 'medium'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-lg">Medium Mode</span>
                      {mode === 'medium' && <span className="text-primary">✓</span>}
                    </div>
                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded">Intermediate</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{getModeDescription('medium')}</p>
                  <div className="flex flex-wrap gap-2">
                    {getAvailableFeatures('medium').map((feature, idx) => (
                      <span key={idx} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Advance Mode */}
                <div
                  onClick={() => handleModeChange('advance')}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 opacity-60 ${
                    mode === 'advance'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-lg">Advance Mode</span>
                      {mode === 'advance' && <span className="text-primary">✓</span>}
                    </div>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">Coming Soon</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{getModeDescription('advance')}</p>
                  <div className="flex flex-wrap gap-2">
                    {getAvailableFeatures('advance').map((feature, idx) => (
                      <span key={idx} className={`text-xs px-2 py-1 rounded ${
                        idx < 4 ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
            <h2 className="text-xl font-semibold text-foreground mb-4">About</h2>
            <p className="text-muted-foreground mb-2">
              Calculator UI v1.0.0
            </p>
            <p className="text-sm text-muted-foreground">
              A modern, feature-rich calculator with multiple modes and themes. 
              Built with React and designed for both basic calculations and advanced mathematical operations.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings; 
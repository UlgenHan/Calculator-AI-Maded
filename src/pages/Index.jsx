import React, { useState } from 'react';
import { Settings } from 'lucide-react';
import ModeSwitcher from '../components/ModeSwitcher';
import BasicPanel from '../components/BasicPanel';
import ScientificPanel from '../components/ScientificPanel';
import MatrixPanel from '../components/MatrixPanel';
import GraphPanel from '../components/GraphPanel';

const Index = () => {
  const [selectedMode, setSelectedMode] = useState('Basic');

  const renderPanel = () => {
    switch (selectedMode) {
      case 'Basic':
        return <BasicPanel />;
      case 'Scientific':
        return <ScientificPanel />;
      case 'Matrix':
        return <MatrixPanel />;
      case 'Graph':
        return <GraphPanel />;
      default:
        return <BasicPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with Logo and Settings */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <h1 className="text-xl font-semibold text-foreground">Calculator</h1>
          </div>
          
          {/* Settings Icon */}
          <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground hover:text-foreground" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 bg-background min-h-screen">
        <div className="max-w-4xl mx-auto">
          <ModeSwitcher 
            selectedMode={selectedMode} 
            onModeChange={setSelectedMode} 
          />
          
          <div className="mt-6">
            {renderPanel()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

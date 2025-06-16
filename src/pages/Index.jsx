
import React, { useState } from 'react';
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
    <div className="min-h-screen bg-slate-900 text-white p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-cyan-400">
          Advanced Calculator
        </h1>
        
        <ModeSwitcher 
          selectedMode={selectedMode} 
          onModeChange={setSelectedMode} 
        />
        
        <div className="mt-6">
          {renderPanel()}
        </div>
      </div>
    </div>
  );
};

export default Index;

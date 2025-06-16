import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import ModeSwitcher from './ModeSwitcher';
import BasicPanel from './BasicPanel.jsx';
import ScientificPanel from './ScientificPanel.jsx';
import MatrixPanel from './MatrixPanel.jsx';
import GraphPanel from './GraphPanel.jsx';

interface CalculatorProps {
  onOpenSettings: () => void;
}

type CalculatorMode = 'basic' | 'medium' | 'advance';
type ActiveTab = 'basic' | 'scientific' | 'matrix' | 'graph';

const Calculator = ({ onOpenSettings }: CalculatorProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('basic');
  const [calculatorMode, setCalculatorMode] = useState<CalculatorMode>('medium');

  // Load initial mode
  useEffect(() => {
    const saved = (localStorage.getItem('calculatorMode') as CalculatorMode) || 'medium';
    setCalculatorMode(saved);
  }, []);

  // Listen for mode changes from settings page
  useEffect(() => {
    const handler = (e: CustomEvent<CalculatorMode>) => {
      setCalculatorMode(e.detail);
    };
    window.addEventListener('calculatorModeChanged', handler as EventListener);
    return () => window.removeEventListener('calculatorModeChanged', handler as EventListener);
  }, []);

  // Tabs available for given mode
  const availableTabs: ActiveTab[] = (() => {
    switch (calculatorMode) {
      case 'basic':
        return ['basic', 'scientific'];
      case 'medium':
        return ['basic', 'scientific', 'matrix', 'graph'];
      case 'advance':
        return ['basic', 'scientific', 'matrix', 'graph'];
      default:
        return ['basic', 'scientific'];
    }
  })();

  // Ensure activeTab is valid whenever mode changes
  useEffect(() => {
    if (!availableTabs.includes(activeTab)) {
      setActiveTab(availableTabs[0]);
    }
  }, [calculatorMode]);

  // Render panel
  const renderPanel = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicPanel />;
      case 'scientific':
        return <ScientificPanel />;
      case 'matrix':
        return <MatrixPanel />;
      case 'graph':
        return <GraphPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-card border-b border-border px-8 py-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Calculator</h1>

          <ModeSwitcher
            activeTab={activeTab}
            onTabChange={setActiveTab}
            availableTabs={availableTabs}
          />

          <button
            onClick={onOpenSettings}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">{renderPanel()}</div>
      </div>
    </div>
  );
};

export default Calculator; 
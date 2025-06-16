import React from 'react';

type ActiveTab = 'basic' | 'scientific' | 'matrix' | 'graph';

interface ModeSwitcherProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  availableTabs?: ActiveTab[];
}

const ModeSwitcher = ({ activeTab, onTabChange, availableTabs = ['basic', 'scientific', 'matrix', 'graph'] }: ModeSwitcherProps) => {
  const tabLabels: Record<ActiveTab, string> = {
    basic: 'Basic',
    scientific: 'Scientific', 
    matrix: 'Matrix',
    graph: 'Graph'
  };

  // Filter tabs based on available tabs
  const visibleTabs = availableTabs.filter(tab => tabLabels[tab]);

  const handleTabClick = (tab: ActiveTab) => {
    console.log('ModeSwitcher: Tab clicked:', tab); // Debug log
    onTabChange(tab);
  };

  return (
    <div className="bg-card rounded-lg p-1 flex space-x-1 shadow-lg border border-border max-w-[200px]">
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={`
            flex-1 py-2 px-2 rounded-md font-medium transition-all duration-200 text-xs
            ${activeTab === tab 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }
          `}
        >
          {tabLabels[tab]}
        </button>
      ))}
    </div>
  );
};

export default ModeSwitcher;

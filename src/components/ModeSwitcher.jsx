import React from 'react';

const ModeSwitcher = ({ selectedMode, onModeChange }) => {
  const modes = ['Basic', 'Scientific', 'Matrix', 'Graph'];

  return (
    <div className="bg-card rounded-xl p-1.5 flex space-x-1 shadow-lg border border-border">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`
            flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm
            ${selectedMode === mode 
              ? 'bg-primary text-primary-foreground shadow-md' 
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
            }
          `}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

export default ModeSwitcher;

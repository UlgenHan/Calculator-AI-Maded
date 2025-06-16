
import React from 'react';

const ModeSwitcher = ({ selectedMode, onModeChange }) => {
  const modes = ['Basic', 'Scientific', 'Matrix', 'Graph'];

  return (
    <div className="bg-slate-800 rounded-lg p-2 flex space-x-2 shadow-lg">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`
            flex-1 py-3 px-4 rounded-md font-medium transition-all duration-200
            ${selectedMode === mode 
              ? 'bg-blue-600 text-white shadow-md transform scale-105' 
              : 'text-gray-400 hover:text-white hover:bg-slate-700'
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


import React from 'react';

const ModeSwitcher = ({ selectedMode, onModeChange }) => {
  const modes = ['Basic', 'Scientific', 'Matrix', 'Graph'];

  return (
    <div className="bg-slate-900 rounded-xl p-1.5 flex space-x-1 shadow-lg border border-slate-800">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onModeChange(mode)}
          className={`
            flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 text-sm
            ${selectedMode === mode 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-gray-400 hover:text-white hover:bg-slate-800'
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

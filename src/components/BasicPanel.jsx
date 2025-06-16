
import React, { useState } from 'react';

const BasicPanel = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const executeOperation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForOperand(true);
    }
  };

  const Button = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      className={`
        h-16 rounded-lg font-semibold text-lg transition-all duration-150
        hover:scale-105 active:scale-95 shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-2xl max-w-md mx-auto">
      {/* Display */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <div className="text-right text-3xl font-mono text-cyan-400 min-h-[3rem] flex items-center justify-end">
          {display}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <Button 
          onClick={clear}
          className="bg-red-600 hover:bg-red-700 text-white col-span-2"
        >
          Clear
        </Button>
        <Button 
          onClick={() => setDisplay(display.slice(0, -1) || '0')}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          ⌫
        </Button>
        <Button 
          onClick={() => performOperation('÷')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          ÷
        </Button>

        {/* Row 2 */}
        <Button 
          onClick={() => inputNumber(7)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          7
        </Button>
        <Button 
          onClick={() => inputNumber(8)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          8
        </Button>
        <Button 
          onClick={() => inputNumber(9)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          9
        </Button>
        <Button 
          onClick={() => performOperation('×')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          ×
        </Button>

        {/* Row 3 */}
        <Button 
          onClick={() => inputNumber(4)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          4
        </Button>
        <Button 
          onClick={() => inputNumber(5)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          5
        </Button>
        <Button 
          onClick={() => inputNumber(6)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          6
        </Button>
        <Button 
          onClick={() => performOperation('-')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          -
        </Button>

        {/* Row 4 */}
        <Button 
          onClick={() => inputNumber(1)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          1
        </Button>
        <Button 
          onClick={() => inputNumber(2)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          2
        </Button>
        <Button 
          onClick={() => inputNumber(3)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          3
        </Button>
        <Button 
          onClick={() => performOperation('+')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          +
        </Button>

        {/* Row 5 */}
        <Button 
          onClick={() => inputNumber(0)}
          className="bg-slate-700 hover:bg-slate-600 text-white col-span-2"
        >
          0
        </Button>
        <Button 
          onClick={inputDecimal}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          .
        </Button>
        <Button 
          onClick={executeOperation}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          =
        </Button>
      </div>
    </div>
  );
};

export default BasicPanel;


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

  return (
    <div className="bg-slate-800 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto border border-slate-700">
      {/* Display */}
      <div className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-700">
        <div className="text-right text-4xl font-light text-white min-h-[4rem] flex items-center justify-end overflow-hidden">
          {display}
        </div>
      </div>

      {/* Buttons Grid - Phone Calculator Style */}
      <div className="grid grid-cols-4 gap-3">
        {/* Row 1 */}
        <button
          onClick={clear}
          className="h-16 bg-gray-500 hover:bg-gray-400 text-black font-semibold text-xl rounded-full transition-all duration-150 active:scale-95"
        >
          AC
        </button>
        <button
          onClick={() => setDisplay(display.slice(0, -1) || '0')}
          className="h-16 bg-gray-500 hover:bg-gray-400 text-black font-semibold text-xl rounded-full transition-all duration-150 active:scale-95"
        >
          ⌫
        </button>
        <button
          onClick={() => performOperation('%')}
          className="h-16 bg-gray-500 hover:bg-gray-400 text-black font-semibold text-xl rounded-full transition-all duration-150 active:scale-95"
        >
          %
        </button>
        <button
          onClick={() => performOperation('÷')}
          className="h-16 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={() => inputNumber(7)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          7
        </button>
        <button
          onClick={() => inputNumber(8)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          8
        </button>
        <button
          onClick={() => inputNumber(9)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          9
        </button>
        <button
          onClick={() => performOperation('×')}
          className="h-16 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          ×
        </button>

        {/* Row 3 */}
        <button
          onClick={() => inputNumber(4)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          4
        </button>
        <button
          onClick={() => inputNumber(5)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          5
        </button>
        <button
          onClick={() => inputNumber(6)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          6
        </button>
        <button
          onClick={() => performOperation('-')}
          className="h-16 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          −
        </button>

        {/* Row 4 */}
        <button
          onClick={() => inputNumber(1)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          1
        </button>
        <button
          onClick={() => inputNumber(2)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          2
        </button>
        <button
          onClick={() => inputNumber(3)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          3
        </button>
        <button
          onClick={() => performOperation('+')}
          className="h-16 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          +
        </button>

        {/* Row 5 */}
        <button
          onClick={() => inputNumber(0)}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95 col-span-2"
        >
          0
        </button>
        <button
          onClick={inputDecimal}
          className="h-16 bg-slate-600 hover:bg-slate-500 text-white font-light text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          .
        </button>
        <button
          onClick={executeOperation}
          className="h-16 bg-orange-500 hover:bg-orange-400 text-white font-semibold text-2xl rounded-full transition-all duration-150 active:scale-95"
        >
          =
        </button>
      </div>
    </div>
  );
};

export default BasicPanel;

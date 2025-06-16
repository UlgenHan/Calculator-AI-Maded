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
    <div className="bg-background rounded-3xl p-6 shadow-2xl max-w-sm mx-auto border border-border">
      {/* Display */}
      <div className="bg-card rounded-2xl p-3 mb-3 border border-border">
        <div className="text-right text-2xl font-light text-foreground min-h-[2.5rem] flex items-center justify-end overflow-hidden">
          {display}
        </div>
      </div>

      {/* Buttons Grid */}
      <div className="w-full max-w-[720px] mx-auto p-6">
        <div className="grid grid-cols-5 sm:grid-cols-4 gap-6 justify-items-center auto-rows-fr">
          {/* Row 1 - Clear, Backspace, Percent, Divide */}
          <div className="contents">
            <button
              onClick={clear}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95"
            >
              AC
            </button>
            <button
              onClick={() => setDisplay(display.slice(0, -1) || '0')}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95"
            >
              ⌫
            </button>
            <button
              onClick={() => performOperation('%')}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95"
            >
              %
            </button>
            <button
              onClick={() => performOperation('÷')}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95"
            >
              ÷
            </button>
            <button
              onClick={() => performOperation('×')}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95 sm:hidden"
            >
              ×
            </button>
          </div>

          {/* Row 2 - Numbers 7, 8, 9, Multiply */}
          <div className="contents">
            <button
              onClick={() => inputNumber(7)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              7
            </button>
            <button
              onClick={() => inputNumber(8)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              8
            </button>
            <button
              onClick={() => inputNumber(9)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              9
            </button>
            <button
              onClick={() => performOperation('×')}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95 hidden sm:block"
            >
              ×
            </button>
            <button
              onClick={() => performOperation('-')}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95 sm:hidden"
            >
              −
            </button>
          </div>

          {/* Row 3 - Numbers 4, 5, 6, Subtract */}
          <div className="contents">
            <button
              onClick={() => inputNumber(4)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              4
            </button>
            <button
              onClick={() => inputNumber(5)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              5
            </button>
            <button
              onClick={() => inputNumber(6)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              6
            </button>
            <button
              onClick={() => performOperation('-')}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95 hidden sm:block"
            >
              −
            </button>
            <button
              onClick={() => performOperation('+')}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95 sm:hidden"
            >
              +
            </button>
          </div>

          {/* Row 4 - Numbers 1, 2, 3, Add */}
          <div className="contents">
            <button
              onClick={() => inputNumber(1)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              1
            </button>
            <button
              onClick={() => inputNumber(2)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              2
            </button>
            <button
              onClick={() => inputNumber(3)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              3
            </button>
            <button
              onClick={() => performOperation('+')}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95 hidden sm:block"
            >
              +
            </button>
            <button
              onClick={executeOperation}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95 sm:hidden"
            >
              =
            </button>
          </div>

          {/* Row 5 - 0, decimal, equals */}
          <div className="contents">
            <button
              onClick={() => inputNumber(0)}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95 col-span-2 sm:col-span-1"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95"
            >
              .
            </button>
            <button
              onClick={executeOperation}
              className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95 hidden sm:block"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicPanel;

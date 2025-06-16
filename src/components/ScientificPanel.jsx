import React, { useState } from 'react';

const ScientificPanel = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState(0);
  const [isRadians, setIsRadians] = useState(true);

  const inputNumber = (num) => {
    setDisplay(display === '0' ? String(num) : display + num);
  };

  const inputDecimal = () => {
    if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
  };

  const calculate = (expression) => {
    try {
      // Replace display symbols with JavaScript operators
      const jsExpression = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, Math.PI)
        .replace(/e/g, Math.E);
      
      const result = eval(jsExpression);
      setDisplay(String(result));
    } catch (error) {
      setDisplay('Error');
    }
  };

  const scientificFunction = (func) => {
    const value = parseFloat(display);
    let result;

    switch (func) {
      case 'sin':
        result = isRadians ? Math.sin(value) : Math.sin(value * Math.PI / 180);
        break;
      case 'cos':
        result = isRadians ? Math.cos(value) : Math.cos(value * Math.PI / 180);
        break;
      case 'tan':
        result = isRadians ? Math.tan(value) : Math.tan(value * Math.PI / 180);
        break;
      case 'ln':
        result = Math.log(value);
        break;
      case 'log':
        result = Math.log10(value);
        break;
      case 'sqrt':
        result = Math.sqrt(value);
        break;
      case 'pow2':
        result = Math.pow(value, 2);
        break;
      case 'pow3':
        result = Math.pow(value, 3);
        break;
      case 'factorial':
        result = factorial(value);
        break;
      case 'inverse':
        result = 1 / value;
        break;
      default:
        result = value;
    }

    setDisplay(String(result));
  };

  const factorial = (n) => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const insertConstant = (constant) => {
    if (display === '0') {
      setDisplay(constant);
    } else {
      setDisplay(display + constant);
    }
  };

  const Button = ({ onClick, className = '', children }) => (
    <button
      onClick={onClick}
      className={`
        h-12 rounded-lg font-semibold text-sm transition-all duration-150
        hover:scale-105 active:scale-95 shadow-lg
        ${className}
      `}
    >
      {children}
    </button>
  );

  return (
    <div className="bg-background rounded-xl p-6 shadow-2xl max-w-2xl mx-auto">
      {/* Display */}
      <div className="bg-card rounded-2xl p-3 mb-10 border border-border">
        <div className="text-right text-2xl font-light text-foreground min-h-[2.5rem] flex items-center justify-end overflow-hidden">
          {display}
        </div>
      </div>

      {/* Buttons Grid and RAD Toggle */}
      <div className="flex gap-6 mt-4">
        {/* Buttons Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-5 sm:grid-cols-4 gap-6 justify-items-center auto-rows-fr">
            {/* Row 1 - Trigonometric & Log */}
            <div className="contents">
              <button onClick={() => scientificFunction('sin')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">sin</button>
              <button onClick={() => scientificFunction('cos')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">cos</button>
              <button onClick={() => scientificFunction('tan')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">tan</button>
              <button onClick={() => scientificFunction('log')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">log</button>
              <button onClick={() => scientificFunction('ln')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">ln</button>
            </div>

            {/* Row 2 - Powers & Roots */}
            <div className="contents">
              <button onClick={() => scientificFunction('sqrt')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">√</button>
              <button onClick={() => scientificFunction('pow2')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">x²</button>
              <button onClick={() => scientificFunction('pow3')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">x³</button>
              <button onClick={() => scientificFunction('^')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">xʸ</button>
              <button onClick={() => scientificFunction('1/x')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">1/x</button>
            </div>

            {/* Row 3 - Clear, Backspace, Percent, Divide */}
            <div className="contents">
              <button onClick={clear} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">AC</button>
              <button onClick={() => setDisplay(display.slice(0, -1) || '0')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">⌫</button>
              <button onClick={() => scientificFunction('%')} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-semibold text-sm rounded-full transition-all duration-150 active:scale-95">%</button>
              <button onClick={() => scientificFunction('÷')} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">÷</button>
              <button onClick={() => scientificFunction('×')} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">×</button>
            </div>

            {/* Row 4 - Numbers 7, 8, 9, Multiply */}
            <div className="contents">
              <button onClick={() => inputNumber(7)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">7</button>
              <button onClick={() => inputNumber(8)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">8</button>
              <button onClick={() => inputNumber(9)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">9</button>
              <button onClick={() => scientificFunction('×')} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">×</button>
              <button onClick={() => scientificFunction('-')} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">−</button>
            </div>

            {/* Row 5 - Numbers 4, 5, 6, Subtract */}
            <div className="contents">
              <button onClick={() => inputNumber(4)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">4</button>
              <button onClick={() => inputNumber(5)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">5</button>
              <button onClick={() => inputNumber(6)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">6</button>
              <button onClick={() => scientificFunction('-')} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">−</button>
              <button onClick={() => scientificFunction('+')} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">+</button>
            </div>

            {/* Row 6 - Numbers 1, 2, 3, Add */}
            <div className="contents">
              <button onClick={() => inputNumber(1)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">1</button>
              <button onClick={() => inputNumber(2)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">2</button>
              <button onClick={() => inputNumber(3)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">3</button>
              <button onClick={() => scientificFunction('+')} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">+</button>
              <button onClick={() => calculate(display)} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">=</button>
            </div>

            {/* Row 7 - 0, decimal, equals */}
            <div className="contents">
              <button onClick={() => inputNumber(0)} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95 col-span-2 sm:col-span-1">0</button>
              <button onClick={inputDecimal} className="w-10 h-10 bg-secondary hover:bg-secondary/80 text-secondary-foreground font-light text-base rounded-full transition-all duration-150 active:scale-95">.</button>
              <button onClick={() => calculate(display)} className="w-10 h-10 bg-primary hover:bg-primary/80 text-primary-foreground font-semibold text-base rounded-full transition-all duration-150 active:scale-95">=</button>
            </div>
          </div>
        </div>

        {/* RAD/DEG Toggle */}
        <div className="flex items-start">
          <button
            onClick={() => setIsRadians(!isRadians)}
            className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-2 rounded-lg h-10"
          >
            {isRadians ? 'RAD' : 'DEG'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScientificPanel;

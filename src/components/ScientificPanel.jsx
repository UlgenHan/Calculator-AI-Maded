
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
    <div className="bg-slate-800 rounded-xl p-6 shadow-2xl max-w-2xl mx-auto">
      {/* Display */}
      <div className="bg-slate-900 rounded-lg p-4 mb-4">
        <div className="text-right text-2xl font-mono text-cyan-400 min-h-[2.5rem] flex items-center justify-end">
          {display}
        </div>
        <div className="text-right text-sm text-gray-400 mt-1">
          Mode: {isRadians ? 'Radians' : 'Degrees'} | Memory: {memory}
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => setIsRadians(!isRadians)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
        >
          {isRadians ? 'RAD' : 'DEG'}
        </button>
      </div>

      {/* Scientific Buttons Grid */}
      <div className="grid grid-cols-6 gap-2">
        {/* Row 1 - Functions */}
        <Button 
          onClick={() => scientificFunction('sin')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          sin
        </Button>
        <Button 
          onClick={() => scientificFunction('cos')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          cos
        </Button>
        <Button 
          onClick={() => scientificFunction('tan')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          tan
        </Button>
        <Button 
          onClick={() => scientificFunction('ln')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          ln
        </Button>
        <Button 
          onClick={() => scientificFunction('log')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          log
        </Button>
        <Button 
          onClick={() => scientificFunction('sqrt')}
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          √
        </Button>

        {/* Row 2 - Powers and Memory */}
        <Button 
          onClick={() => scientificFunction('pow2')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          x²
        </Button>
        <Button 
          onClick={() => scientificFunction('pow3')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          x³
        </Button>
        <Button 
          onClick={() => setDisplay(display + '^')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          x^y
        </Button>
        <Button 
          onClick={() => scientificFunction('factorial')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          x!
        </Button>
        <Button 
          onClick={() => scientificFunction('inverse')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          1/x
        </Button>
        <Button 
          onClick={() => setMemory(parseFloat(display))}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          MS
        </Button>

        {/* Row 3 - Constants and Memory */}
        <Button 
          onClick={() => insertConstant('π')}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          π
        </Button>
        <Button 
          onClick={() => insertConstant('e')}
          className="bg-yellow-600 hover:bg-yellow-700 text-white"
        >
          e
        </Button>
        <Button 
          onClick={() => setDisplay(display + '(')}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          (
        </Button>
        <Button 
          onClick={() => setDisplay(display + ')')}
          className="bg-gray-600 hover:bg-gray-700 text-white"
        >
          )
        </Button>
        <Button 
          onClick={clear}
          className="bg-red-600 hover:bg-red-700 text-white"
        >
          C
        </Button>
        <Button 
          onClick={() => setDisplay(String(memory))}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          MR
        </Button>

        {/* Row 4 - Numbers */}
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
          onClick={() => setDisplay(display + '÷')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          ÷
        </Button>
        <Button 
          onClick={() => setDisplay(display + '×')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          ×
        </Button>
        <Button 
          onClick={() => setDisplay(display.slice(0, -1) || '0')}
          className="bg-orange-600 hover:bg-orange-700 text-white"
        >
          ⌫
        </Button>

        {/* Row 5 */}
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
          onClick={() => setDisplay(display + '-')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          -
        </Button>
        <Button 
          onClick={() => setDisplay(display + '+')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          +
        </Button>
        <Button 
          onClick={() => calculate(display)}
          className="bg-green-600 hover:bg-green-700 text-white row-span-2"
        >
          =
        </Button>

        {/* Row 6 */}
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
          onClick={() => inputNumber(0)}
          className="bg-slate-700 hover:bg-slate-600 text-white col-span-2"
        >
          0
        </Button>

        {/* Last row */}
        <Button 
          onClick={inputDecimal}
          className="bg-slate-700 hover:bg-slate-600 text-white col-span-5"
        >
          .
        </Button>
      </div>
    </div>
  );
};

export default ScientificPanel;

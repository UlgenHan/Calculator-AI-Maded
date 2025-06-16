
import React, { useState, useEffect, useRef } from 'react';

const GraphPanel = () => {
  const [equation, setEquation] = useState('x^2');
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const canvasRef = useRef(null);

  const evaluateFunction = (x, equation) => {
    try {
      // Replace common mathematical expressions with JavaScript equivalents
      let jsEquation = equation
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/ln/g, 'Math.log')
        .replace(/log/g, 'Math.log10')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/pi/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/abs/g, 'Math.abs')
        .replace(/x/g, `(${x})`);

      return eval(jsEquation);
    } catch (error) {
      return NaN;
    }
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Set up coordinate system
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xScale = width / xRange;
    const yScale = height / yRange;

    // Convert world coordinates to canvas coordinates
    const worldToCanvas = (x, y) => ({
      x: (x - xMin) * xScale,
      y: height - (y - yMin) * yScale
    });

    // Draw grid
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 1;

    // Vertical grid lines
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      const canvasX = worldToCanvas(x, 0).x;
      ctx.beginPath();
      ctx.moveTo(canvasX, 0);
      ctx.lineTo(canvasX, height);
      ctx.stroke();
    }

    // Horizontal grid lines
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      const canvasY = worldToCanvas(0, y).y;
      ctx.beginPath();
      ctx.moveTo(0, canvasY);
      ctx.lineTo(width, canvasY);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#6B7280';
    ctx.lineWidth = 2;

    // X-axis
    if (yMin <= 0 && yMax >= 0) {
      const axisY = worldToCanvas(0, 0).y;
      ctx.beginPath();
      ctx.moveTo(0, axisY);
      ctx.lineTo(width, axisY);
      ctx.stroke();
    }

    // Y-axis
    if (xMin <= 0 && xMax >= 0) {
      const axisX = worldToCanvas(0, 0).x;
      ctx.beginPath();
      ctx.moveTo(axisX, 0);
      ctx.lineTo(axisX, height);
      ctx.stroke();
    }

    // Draw function
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 3;
    ctx.beginPath();

    let firstPoint = true;
    const step = xRange / width;

    for (let x = xMin; x <= xMax; x += step) {
      const y = evaluateFunction(x, equation);
      
      if (!isNaN(y) && isFinite(y) && y >= yMin && y <= yMax) {
        const canvasPoint = worldToCanvas(x, y);
        
        if (firstPoint) {
          ctx.moveTo(canvasPoint.x, canvasPoint.y);
          firstPoint = false;
        } else {
          ctx.lineTo(canvasPoint.x, canvasPoint.y);
        }
      } else {
        firstPoint = true;
      }
    }

    ctx.stroke();

    // Draw axis labels
    ctx.fillStyle = '#9CA3AF';
    ctx.font = '12px monospace';
    ctx.textAlign = 'center';

    // X-axis labels
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      if (x !== 0) {
        const canvasPoint = worldToCanvas(x, 0);
        ctx.fillText(x.toString(), canvasPoint.x, canvasPoint.y + 15);
      }
    }

    // Y-axis labels
    ctx.textAlign = 'right';
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      if (y !== 0) {
        const canvasPoint = worldToCanvas(0, y);
        ctx.fillText(y.toString(), canvasPoint.x - 5, canvasPoint.y + 4);
      }
    }
  };

  useEffect(() => {
    drawGraph();
  }, [equation, xMin, xMax, yMin, yMax]);

  const presetEquations = [
    { name: 'Quadratic', equation: 'x^2' },
    { name: 'Cubic', equation: 'x^3' },
    { name: 'Sine', equation: 'sin(x)' },
    { name: 'Cosine', equation: 'cos(x)' },
    { name: 'Exponential', equation: 'Math.E^x' },
    { name: 'Logarithm', equation: 'ln(x)' },
    { name: 'Absolute', equation: 'abs(x)' },
    { name: 'Square Root', equation: 'sqrt(x)' }
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-2xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">Function Grapher</h2>
      
      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Equation Input */}
        <div className="space-y-4">
          <div>
            <label className="block text-white mb-2 font-semibold">
              Function: f(x) =
            </label>
            <input
              type="text"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:border-cyan-400 focus:outline-none font-mono"
              placeholder="Enter function (e.g., x^2, sin(x), ln(x))"
            />
          </div>

          {/* Preset Functions */}
          <div>
            <label className="block text-white mb-2 font-semibold">Quick Functions:</label>
            <div className="grid grid-cols-2 gap-2">
              {presetEquations.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setEquation(preset.equation)}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded text-sm transition-all duration-150 hover:scale-105"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Range Controls */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white mb-1 text-sm">X Min:</label>
              <input
                type="number"
                value={xMin}
                onChange={(e) => setXMin(parseFloat(e.target.value))}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-sm">X Max:</label>
              <input
                type="number"
                value={xMax}
                onChange={(e) => setXMax(parseFloat(e.target.value))}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-sm">Y Min:</label>
              <input
                type="number"
                value={yMin}
                onChange={(e) => setYMin(parseFloat(e.target.value))}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 focus:border-cyan-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white mb-1 text-sm">Y Max:</label>
              <input
                type="number"
                value={yMax}
                onChange={(e) => setYMax(parseFloat(e.target.value))}
                className="w-full bg-slate-700 text-white border border-slate-600 rounded px-3 py-2 focus:border-cyan-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Quick Range Presets */}
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setXMin(-10); setXMax(10); setYMin(-10); setYMax(10);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-all duration-150 hover:scale-105"
            >
              Standard
            </button>
            <button
              onClick={() => {
                setXMin(-5); setXMax(5); setYMin(-5); setYMax(5);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-all duration-150 hover:scale-105"
            >
              Zoom In
            </button>
            <button
              onClick={() => {
                setXMin(-20); setXMax(20); setYMin(-20); setYMax(20);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-all duration-150 hover:scale-105"
            >
              Zoom Out
            </button>
          </div>
        </div>
      </div>

      {/* Graph Canvas */}
      <div className="bg-slate-900 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full h-auto border border-slate-700 rounded bg-slate-900"
        />
      </div>

      {/* Function Help */}
      <div className="mt-4 text-sm text-gray-400">
        <p><strong>Supported functions:</strong> sin(x), cos(x), tan(x), ln(x), log(x), sqrt(x), abs(x), pi, e</p>
        <p><strong>Operators:</strong> +, -, *, /, ^ (power)</p>
        <p><strong>Examples:</strong> x^2, sin(x), 2*x + 3, sqrt(x^2 + 1)</p>
      </div>
    </div>
  );
};

export default GraphPanel;

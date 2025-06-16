import React, { useState, useMemo } from 'react';
import Plot from 'react-plotly.js';
import { create, all } from 'mathjs';

const math = create(all);

const defaultFunctions = [
  { label: 'f(x)', expr: 'x^2', color: '#1f77b4' },
];

const presetEquations = [
  { name: 'Quadratic', equation: 'x^2' },
  { name: 'Cubic', equation: 'x^3' },
  { name: 'Sine', equation: 'sin(x)' },
  { name: 'Cosine', equation: 'cos(x)' },
  { name: 'Exponential', equation: 'e^x' },
  { name: 'Logarithm', equation: 'log(x)' },
  { name: 'Absolute', equation: 'abs(x)' },
  { name: 'Square Root', equation: 'sqrt(x)' },
];

const getParameters = (expr) => {
  // Find all single-letter variables except x
  const matches = expr.match(/[a-wyzA-WYZ]/g);
  if (!matches) return [];
  return Array.from(new Set(matches));
};

const GraphPanel = () => {
  const [functions, setFunctions] = useState(defaultFunctions);
  const [xMin, setXMin] = useState(-10);
  const [xMax, setXMax] = useState(10);
  const [yMin, setYMin] = useState(-10);
  const [yMax, setYMax] = useState(10);
  const [paramValues, setParamValues] = useState({});
  const [showLegend, setShowLegend] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [axisType, setAxisType] = useState('linear');

  // Add a new function
  const addFunction = () => {
    setFunctions([...functions, { label: `f${functions.length+1}(x)`, expr: '', color: '#ff7f0e' }]);
  };

  // Remove a function
  const removeFunction = (idx) => {
    setFunctions(functions.filter((_, i) => i !== idx));
  };

  // Update a function
  const updateFunction = (idx, key, value) => {
    setFunctions(functions.map((fn, i) => i === idx ? { ...fn, [key]: value } : fn));
  };

  // Update parameter value
  const updateParam = (param, value) => {
    setParamValues({ ...paramValues, [param]: value });
  };

  // Generate plot data and error in a memoized way
  const { plotData, error } = useMemo(() => {
    let error = null;
    let plotData = [];
    let validCount = 0;
    try {
      plotData = functions.map((fn, idx) => {
        if (!fn.expr.trim()) return null;
        const expr = fn.expr.replace(/\^/g, '**').replace(/e/g, 'E');
        const params = getParameters(expr);
        let compiled;
        try {
          compiled = math.compile(expr);
        } catch (err) {
          return null; // Ignore invalid function
        }
        const x = [];
        const y = [];
        for (let i = 0; i <= 800; i++) {
          const xv = xMin + (xMax - xMin) * (i / 800);
          const scope = { x: xv };
          params.forEach((p) => { scope[p] = paramValues[p] ?? 1; });
          let yv;
          try {
            yv = compiled.evaluate(scope);
          } catch {
            yv = NaN;
          }
          x.push(xv);
          y.push(yv);
        }
        if (y.some(val => typeof val === 'number' && isFinite(val))) validCount++;
        return {
          x, y,
          type: 'scatter',
          mode: 'lines',
          name: fn.label,
          line: { color: fn.color, width: 3 },
          visible: true,
        };
      }).filter(Boolean);
      if (validCount === 0) {
        error = 'No valid function to plot. Please check your input.';
      }
    } catch (err) {
      error = err.message || 'Invalid function.';
      plotData = [];
    }
    return { plotData, error };
  }, [functions, xMin, xMax, yMin, yMax, paramValues]);

  // Collect all unique parameters
  const allParams = Array.from(new Set(functions.flatMap(fn => getParameters(fn.expr.replace(/\^/g, '**')))));

  return (
    <div className="bg-background rounded-xl p-6 shadow-2xl max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Function Grapher</h2>
      {/* Controls */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Function Inputs */}
        <div className="space-y-4">
          {functions.map((fn, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={fn.expr}
                onChange={e => updateFunction(idx, 'expr', e.target.value)}
                className="flex-1 bg-card text-foreground border border-border rounded-lg px-3 py-2 font-mono"
                placeholder={`Function ${fn.label} (e.g., x^2 + a*x)`}
              />
              <input
                type="text"
                value={fn.label}
                onChange={e => updateFunction(idx, 'label', e.target.value)}
                className="w-20 bg-card text-foreground border border-border rounded-lg px-2 py-2 font-mono"
                placeholder="Label"
              />
              <input
                type="color"
                value={fn.color}
                onChange={e => updateFunction(idx, 'color', e.target.value)}
                className="w-8 h-8 p-0 border border-border rounded-lg"
                title="Color"
              />
              {functions.length > 1 && (
                <button onClick={() => removeFunction(idx)} className="text-destructive px-2 py-1 rounded hover:bg-destructive/10">✕</button>
              )}
            </div>
          ))}
          <button onClick={addFunction} className="bg-primary hover:bg-primary/80 text-primary-foreground px-3 py-2 rounded-lg text-sm">+ Add Function</button>
          {/* Preset Functions */}
          <div>
            <label className="block text-foreground mb-2 font-semibold">Quick Functions:</label>
            <div className="grid grid-cols-2 gap-2">
              {presetEquations.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => updateFunction(0, 'expr', preset.equation)}
                  className="bg-primary hover:bg-primary/80 text-primary-foreground py-2 px-3 rounded text-sm transition-all duration-150 hover:scale-105"
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Parameter Sliders & Range Controls */}
        <div className="space-y-4">
          {/* Parameter Sliders */}
          {allParams.length > 0 && (
            <div className="mb-4">
              <label className="block text-foreground mb-2 font-semibold">Parameters:</label>
              <div className="flex flex-wrap gap-4">
                {allParams.map(param => (
                  <div key={param} className="flex items-center gap-2">
                    <span className="font-mono">{param}:</span>
                    <input
                      type="range"
                      min="-10" max="10" step="0.1"
                      value={paramValues[param] ?? 1}
                      onChange={e => updateParam(param, parseFloat(e.target.value))}
                      className="w-32"
                    />
                    <input
                      type="number"
                      value={paramValues[param] ?? 1}
                      onChange={e => updateParam(param, parseFloat(e.target.value))}
                      className="w-16 bg-card text-foreground border border-border rounded px-2 py-1 text-xs text-center"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Range Controls */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-foreground mb-2 font-semibold">X Range:</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={xMin}
                  onChange={e => setXMin(parseFloat(e.target.value))}
                  className="w-full bg-card text-foreground border border-border rounded-lg px-3 py-2 focus:border-primary focus:outline-none"
                />
                <input
                  type="number"
                  value={xMax}
                  onChange={e => setXMax(parseFloat(e.target.value))}
                  className="w-full bg-card text-foreground border border-border rounded-lg px-3 py-2 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-foreground mb-2 font-semibold">Y Range:</label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={yMin}
                  onChange={e => setYMin(parseFloat(e.target.value))}
                  className="w-full bg-card text-foreground border border-border rounded-lg px-3 py-2 focus:border-primary focus:outline-none"
                />
                <input
                  type="number"
                  value={yMax}
                  onChange={e => setYMax(parseFloat(e.target.value))}
                  className="w-full bg-card text-foreground border border-border rounded-lg px-3 py-2 focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>
          {/* Axis/Grid/Legend Controls */}
          <div className="flex flex-wrap gap-4 mt-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={showLegend} onChange={e => setShowLegend(e.target.checked)} /> Show Legend
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={showGrid} onChange={e => setShowGrid(e.target.checked)} /> Show Grid
            </label>
            <label className="flex items-center gap-2">
              Axis Type:
              <select value={axisType} onChange={e => setAxisType(e.target.value)} className="bg-card border border-border rounded px-2 py-1">
                <option value="linear">Linear</option>
                <option value="log">Log</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      {/* Plotly Graph */}
      <div className="bg-card rounded-lg p-4 min-h-[420px] flex flex-col items-center justify-center overflow-x-auto" style={{background:'hsl(var(--background))'}}>
        {error ? (
          <div className="text-destructive text-center font-semibold text-lg">{error}</div>
        ) : (
          <div className="w-full max-w-full" style={{overflowX:'auto'}}>
            <Plot
              data={plotData}
              layout={{
                autosize: true,
                width: undefined,
                height: 400,
                margin: { l: 50, r: 30, t: 30, b: 50 },
                xaxis: {
                  range: [xMin, xMax],
                  title: 'x',
                  showgrid: showGrid,
                  type: axisType,
                },
                yaxis: {
                  range: [yMin, yMax],
                  title: 'y',
                  showgrid: showGrid,
                  type: axisType,
                },
                legend: { orientation: 'h', y: -0.2 },
                showlegend: showLegend,
                plot_bgcolor: 'hsl(var(--background))',
                paper_bgcolor: 'hsl(var(--background))',
                font: { color: 'hsl(var(--foreground))' },
              }}
              config={{
                responsive: true,
                displayModeBar: true,
                toImageButtonOptions: {
                  format: 'png',
                  filename: 'function-graph',
                  height: 400,
                  width: 800,
                  scale: 2,
                },
                displaylogo: false,
              }}
              style={{ width: '100%', minWidth: 300, height: '400px', maxWidth: '100%' }}
            />
          </div>
        )}
      </div>
      {/* Function Help */}
      <div className="mt-4 text-sm text-gray-400">
        <p><strong>Supported functions:</strong> sin(x), cos(x), tan(x), log(x), sqrt(x), abs(x), e</p>
        <p><strong>Operators:</strong> +, -, *, /, ^ (power)</p>
        <p><strong>Examples:</strong> x^2, sin(x), 2*x + 3, sqrt(x^2 + 1), x^2 + a*x (with slider for a)</p>
      </div>
    </div>
  );
};

export default GraphPanel;

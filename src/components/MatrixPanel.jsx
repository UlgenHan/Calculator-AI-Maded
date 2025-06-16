
import React, { useState } from 'react';

const MatrixPanel = () => {
  const [matrixA, setMatrixA] = useState([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState([[5, 6], [7, 8]]);
  const [result, setResult] = useState(null);
  const [matrixSize, setMatrixSize] = useState({ rows: 2, cols: 2 });

  const createEmptyMatrix = (rows, cols) => {
    return Array(rows).fill().map(() => Array(cols).fill(0));
  };

  const resizeMatrix = (matrix, newRows, newCols) => {
    const resized = createEmptyMatrix(newRows, newCols);
    for (let i = 0; i < Math.min(matrix.length, newRows); i++) {
      for (let j = 0; j < Math.min(matrix[0].length, newCols); j++) {
        resized[i][j] = matrix[i][j];
      }
    }
    return resized;
  };

  const updateMatrixSize = (newRows, newCols) => {
    setMatrixSize({ rows: newRows, cols: newCols });
    setMatrixA(resizeMatrix(matrixA, newRows, newCols));
    setMatrixB(resizeMatrix(matrixB, newRows, newCols));
  };

  const updateMatrixValue = (matrix, setMatrix, row, col, value) => {
    const newMatrix = matrix.map((r, i) => 
      r.map((c, j) => i === row && j === col ? parseFloat(value) || 0 : c)
    );
    setMatrix(newMatrix);
  };

  const addMatrices = () => {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      setResult('Error: Matrices must have same dimensions');
      return;
    }
    
    const sum = matrixA.map((row, i) => 
      row.map((val, j) => val + matrixB[i][j])
    );
    setResult(sum);
  };

  const subtractMatrices = () => {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      setResult('Error: Matrices must have same dimensions');
      return;
    }
    
    const difference = matrixA.map((row, i) => 
      row.map((val, j) => val - matrixB[i][j])
    );
    setResult(difference);
  };

  const multiplyMatrices = () => {
    if (matrixA[0].length !== matrixB.length) {
      setResult('Error: Matrix A columns must equal Matrix B rows');
      return;
    }

    const product = Array(matrixA.length).fill().map(() => Array(matrixB[0].length).fill(0));
    
    for (let i = 0; i < matrixA.length; i++) {
      for (let j = 0; j < matrixB[0].length; j++) {
        for (let k = 0; k < matrixB.length; k++) {
          product[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }
    setResult(product);
  };

  const calculateDeterminant = (matrix) => {
    if (matrix.length !== matrix[0].length) {
      return 'Error: Matrix must be square';
    }

    const n = matrix.length;
    if (n === 1) return matrix[0][0];
    if (n === 2) return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    let det = 0;
    for (let i = 0; i < n; i++) {
      const subMatrix = matrix.slice(1).map(row => 
        row.filter((_, colIndex) => colIndex !== i)
      );
      det += matrix[0][i] * Math.pow(-1, i) * calculateDeterminant(subMatrix);
    }
    return det;
  };

  const transposeMatrix = (matrix) => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  };

  const MatrixInput = ({ matrix, setMatrix, label }) => (
    <div className="bg-slate-700 rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3 text-cyan-400">{label}</h3>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixSize.cols}, 1fr)` }}>
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val}
              onChange={(e) => updateMatrixValue(matrix, setMatrix, i, j, e.target.value)}
              className="w-16 h-12 text-center bg-slate-800 border border-slate-600 rounded text-white focus:border-cyan-400 focus:outline-none"
            />
          ))
        )}
      </div>
    </div>
  );

  const ResultDisplay = () => {
    if (!result) return null;

    if (typeof result === 'string') {
      return (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-red-400">Result</h3>
          <p className="text-red-300">{result}</p>
        </div>
      );
    }

    if (typeof result === 'number') {
      return (
        <div className="bg-slate-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-cyan-400">Result</h3>
          <p className="text-2xl font-mono text-green-400">{result}</p>
        </div>
      );
    }

    return (
      <div className="bg-slate-700 rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-cyan-400">Result Matrix</h3>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result[0].length}, 1fr)` }}>
          {result.map((row, i) =>
            row.map((val, j) => (
              <div
                key={`${i}-${j}`}
                className="w-16 h-12 flex items-center justify-center bg-slate-800 border border-slate-600 rounded text-green-400 font-mono"
              >
                {typeof val === 'number' ? val.toFixed(2) : val}
              </div>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-cyan-400">Matrix Calculator</h2>
      
      {/* Matrix Size Controls */}
      <div className="mb-6 flex justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <label className="text-white">Rows:</label>
          <select
            value={matrixSize.rows}
            onChange={(e) => updateMatrixSize(parseInt(e.target.value), matrixSize.cols)}
            className="bg-slate-700 text-white rounded px-2 py-1"
          >
            {[2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-white">Columns:</label>
          <select
            value={matrixSize.cols}
            onChange={(e) => updateMatrixSize(matrixSize.rows, parseInt(e.target.value))}
            className="bg-slate-700 text-white rounded px-2 py-1"
          >
            {[2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
      </div>

      {/* Matrix Inputs */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <MatrixInput matrix={matrixA} setMatrix={setMatrixA} label="Matrix A" />
        <MatrixInput matrix={matrixB} setMatrix={setMatrixB} label="Matrix B" />
      </div>

      {/* Operation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <button
          onClick={addMatrices}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-150 hover:scale-105"
        >
          A + B
        </button>
        <button
          onClick={subtractMatrices}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-150 hover:scale-105"
        >
          A - B
        </button>
        <button
          onClick={multiplyMatrices}
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-150 hover:scale-105"
        >
          A × B
        </button>
        <button
          onClick={() => setResult(transposeMatrix(matrixA))}
          className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-150 hover:scale-105"
        >
          Transpose A
        </button>
        <button
          onClick={() => setResult(calculateDeterminant(matrixA))}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-150 hover:scale-105"
        >
          Det(A)
        </button>
        <button
          onClick={() => setResult(calculateDeterminant(matrixB))}
          className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-150 hover:scale-105"
        >
          Det(B)
        </button>
        <button
          onClick={() => setResult(null)}
          className="bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-150 hover:scale-105 md:col-span-2"
        >
          Clear Result
        </button>
      </div>

      {/* Result Display */}
      <ResultDisplay />
    </div>
  );
};

export default MatrixPanel;

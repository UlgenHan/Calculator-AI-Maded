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
    const rows = Math.max(1, newRows);
    const cols = Math.max(1, newCols);
    setMatrixSize({ rows, cols });
    setMatrixA(resizeMatrix(matrixA, rows, cols));
    setMatrixB(resizeMatrix(matrixB, rows, cols));
  };

  const handleRowsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      updateMatrixSize(value, matrixSize.cols);
    }
  };

  const handleColsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      updateMatrixSize(matrixSize.rows, value);
    }
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
    <div className="bg-card rounded-lg p-4 overflow-auto max-w-full">
      <h3 className="text-lg font-semibold mb-3 text-primary">{label}</h3>
      <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${matrixSize.cols}, 1fr)` }}>
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <input
              key={`${i}-${j}`}
              type="number"
              value={val}
              onChange={(e) => updateMatrixValue(matrix, setMatrix, i, j, e.target.value)}
              className="w-14 bg-card text-foreground border border-border rounded px-2 py-1 text-xs text-center m-1 focus:border-primary focus:outline-none"
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
        <div className="bg-destructive/20 border border-destructive rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-destructive">Result</h3>
          <p className="text-destructive-foreground">{result}</p>
        </div>
      );
    }

    if (typeof result === 'number') {
      return (
        <div className="bg-card rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-2 text-primary">Result</h3>
          <p className="text-2xl font-mono text-primary">{result}</p>
        </div>
      );
    }

    return (
      <div className="bg-card rounded-lg p-4">
        <h3 className="text-lg font-semibold mb-3 text-primary">Result Matrix</h3>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result[0].length}, 1fr)` }}>
          {result.map((row, i) =>
            row.map((val, j) => (
              <div
                key={`${i}-${j}`}
                className="w-16 h-12 flex items-center justify-center bg-background border border-border rounded text-primary font-mono"
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
    <div className="bg-background rounded-xl p-6 shadow-2xl max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-primary">Matrix Calculator</h2>
      
      {/* Matrix Size Controls */}
      <div className="mb-6 flex justify-center space-x-6">
        <div className="flex items-center space-x-2">
          <label className="text-foreground font-medium" htmlFor="rows-input">Rows:</label>
          <input
            id="rows-input"
            type="number"
            min="1"
            value={matrixSize.rows}
            onChange={handleRowsChange}
            className="w-14 bg-card text-foreground border border-border rounded px-2 py-1 text-xs text-center m-1 focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <label className="text-foreground font-medium" htmlFor="cols-input">Columns:</label>
          <input
            id="cols-input"
            type="number"
            min="1"
            value={matrixSize.cols}
            onChange={handleColsChange}
            className="w-14 bg-card text-foreground border border-border rounded px-2 py-1 text-xs text-center m-1 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Matrix Inputs */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <MatrixInput matrix={matrixA} setMatrix={setMatrixA} label="Matrix A" />
        <MatrixInput matrix={matrixB} setMatrix={setMatrixB} label="Matrix B" />
      </div>

      {/* Operation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-items-center mb-6">
        <button
          onClick={addMatrices}
          className="bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 px-3 rounded-full text-xs font-medium transition-colors duration-150"
        >
          Add
        </button>
        <button
          onClick={subtractMatrices}
          className="bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 px-3 rounded-full text-xs font-medium transition-colors duration-150"
        >
          Subtract
        </button>
        <button
          onClick={multiplyMatrices}
          className="bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 px-3 rounded-full text-xs font-medium transition-colors duration-150"
        >
          Multiply
        </button>
        <button
          onClick={() => setResult(calculateDeterminant(matrixA))}
          className="bg-primary hover:bg-primary/80 text-primary-foreground py-1.5 px-3 rounded-full text-xs font-medium transition-colors duration-150"
        >
          Determinant
        </button>
      </div>

      {/* Result Display */}
      <ResultDisplay />
    </div>
  );
};

export default MatrixPanel;

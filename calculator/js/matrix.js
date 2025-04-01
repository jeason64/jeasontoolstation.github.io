class MatrixCalculator {
    static createMatrix(rows, cols, containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = '';
        
        const table = document.createElement('table');
        for (let i = 0; i < rows; i++) {
            const tr = document.createElement('tr');
            for (let j = 0; j < cols; j++) {
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.type = 'number';
                input.value = '0';
                input.dataset.row = i;
                input.dataset.col = j;
                td.appendChild(input);
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        container.appendChild(table);
    }

    static getMatrix(containerId) {
        const inputs = document.querySelectorAll(`#${containerId} input`);
        const matrix = [];
        inputs.forEach(input => {
            const row = parseInt(input.dataset.row);
            const col = parseInt(input.dataset.col);
            if (!matrix[row]) matrix[row] = [];
            matrix[row][col] = parseFloat(input.value) || 0;
        });
        return matrix;
    }

    static add(a, b) {
        return a.map((row, i) => row.map((val, j) => val + b[i][j]));
    }

    static multiply(a, b) {
        const result = [];
        for (let i = 0; i < a.length; i++) {
            result[i] = [];
            for (let j = 0; j < b[0].length; j++) {
                let sum = 0;
                for (let k = 0; k < a[0].length; k++) {
                    sum += a[i][k] * b[k][j];
                }
                result[i][j] = sum;
            }
        }
        return result;
    }

    static determinant(matrix) {
        if (matrix.length === 2) {
            return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        }
        // 更高阶行列式计算
        return '仅支持2x2矩阵';
    }
}

class MatrixUI {
    constructor() {
        this.setupEventListeners();
        MatrixCalculator.createMatrix(2, 2, 'matrix-a-inputs');
        MatrixCalculator.createMatrix(2, 2, 'matrix-b-inputs');
    }

    setupEventListeners() {
        document.getElementById('create-matrix').addEventListener('click', () => {
            const rows = parseInt(document.getElementById('rows').value) || 2;
            const cols = parseInt(document.getElementById('cols').value) || 2;
            MatrixCalculator.createMatrix(rows, cols, 'matrix-a-inputs');
            MatrixCalculator.createMatrix(rows, cols, 'matrix-b-inputs');
        });

        document.querySelectorAll('[data-op]').forEach(btn => {
            btn.addEventListener('click', () => {
                const op = btn.dataset.op;
                const a = MatrixCalculator.getMatrix('matrix-a-inputs');
                const b = MatrixCalculator.getMatrix('matrix-b-inputs');
                
                let result;
                switch(op) {
                    case 'add': 
                        result = MatrixCalculator.add(a, b);
                        break;
                    case 'multiply':
                        result = MatrixCalculator.multiply(a, b);
                        break;
                    case 'det':
                        result = [[MatrixCalculator.determinant(a)]];
                        break;
                    default:
                        result = [['不支持的操作']];
                }
                
                this.displayResult(result);
            });
        });
    }

    displayResult(result) {
        const container = document.getElementById('matrix-result');
        container.innerHTML = '';
        
        const table = document.createElement('table');
        result.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(val => {
                const td = document.createElement('td');
                td.textContent = val;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });
        container.appendChild(table);
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new MatrixUI();
});
import calculator from './math-core.js';

class UIController {
    constructor() {
        this.expressionElement = document.querySelector('.expression');
        this.resultElement = document.querySelector('.result');
        this.historyElement = document.querySelector('.history-panel');
        
        this.currentExpression = '';
        this.lastResult = '';
        
        this.initEventListeners();
        this.updatePrecisionSettings();
    }
    
    initEventListeners() {
        // 数字按钮
        document.querySelectorAll('[data-val]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendToExpression(button.getAttribute('data-val'));
            });
        });
        
        // 操作符按钮
        document.querySelectorAll('[data-op]').forEach(button => {
            button.addEventListener('click', () => {
                this.appendToExpression(` ${button.getAttribute('data-op')} `);
            });
        });
        
        // 功能按钮
        document.querySelectorAll('[data-fn]').forEach(button => {
            button.addEventListener('click', () => {
                this.handleFunction(button.getAttribute('data-fn'));
            });
        });
        
        // 常数按钮
        document.querySelectorAll('[data-const]').forEach(button => {
            button.addEventListener('click', () => {
                const constName = button.getAttribute('data-const');
                this.appendToExpression(constName);
            });
        });
        
        // 精度设置
        document.getElementById('integer-digits').addEventListener('change', (e) => {
            calculator.setPrecision(parseInt(e.target.value), calculator.precision.decimal);
        });
        
        document.getElementById('decimal-digits').addEventListener('change', (e) => {
            calculator.setPrecision(calculator.precision.integer, parseInt(e.target.value));
        });
        
        // 符号模式
        document.getElementById('symbolic-mode').addEventListener('change', (e) => {
            calculator.symbolicMode = e.target.value;
            this.updateDisplay();
        });
    }
    
    updatePrecisionSettings() {
        document.getElementById('integer-digits').value = calculator.precision.integer;
        document.getElementById('decimal-digits').value = calculator.precision.decimal;
    }
    
    appendToExpression(value) {
        this.currentExpression += value;
        this.updateDisplay();
    }
    
    handleFunction(fn) {
        switch(fn) {
            case 'clear':
                this.currentExpression = '';
                this.lastResult = '';
                break;
                
            case 'backspace':
                this.currentExpression = this.currentExpression.slice(0, -1);
                break;
                
            case 'equals':
                this.calculate();
                break;
                
            // 其他功能处理...
            default:
                this.appendToExpression(`${fn}(`);
        }
        this.updateDisplay();
    }
    
    calculate() {
        try {
            const result = calculator.evaluateExpression(this.currentExpression);
            
            if (result.error) {
                this.lastResult = `Error: ${result.error}`;
            } else {
                calculator.history.push({
                    expression: this.currentExpression,
                    result: result.value
                });
                
                this.lastResult = result.symbolic ? 
                    `${result.value} (${result.symbolic})` : 
                    result.value;
                
                this.currentExpression = '';
            }
            
            this.updateHistory();
        } catch (error) {
            this.lastResult = `Error: ${error.message}`;
        }
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.expressionElement.textContent = this.currentExpression;
        this.resultElement.textContent = this.lastResult || '0';
    }
    
    updateHistory() {
        this.historyElement.innerHTML = calculator.history
            .slice(-3)
            .map(item => `<div>${item.expression} = ${item.result}</div>`)
            .join('');
    }
}

// 初始化UI
document.addEventListener('DOMContentLoaded', () => {
    const ui = new UIController();
});
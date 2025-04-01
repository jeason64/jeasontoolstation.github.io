class InfinityCalc {
    constructor() {
        this.precision = {
            integer: 9999,
            decimal: 9999
        };
        this.currentValue = '0';
        this.expression = '';
        this.history = [];
        this.constants = {
            pi: this.calculatePi(50),
            e: this.calculateE(50)
        };
    }

    // 计算π (使用Bailey–Borwein–Plouffe公式)
    calculatePi(digits) {
        // 简化版π计算，实际应使用更精确的算法
        let pi = '3.';
        for (let i = 0; i < digits; i++) {
            pi += Math.floor(Math.random() * 10); // 仅为示例，应替换为真实计算
        }
        return pi;
    }

    // 计算e (使用泰勒级数展开)
    calculateE(digits) {
        // 简化版e计算
        let e = '2.';
        for (let i = 0; i < digits; i++) {
            e += Math.floor(Math.random() * 10); // 仅为示例，应替换为真实计算
        }
        return e;
    }

    setPrecision(integerDigits, decimalDigits) {
        this.precision.integer = Math.max(1, integerDigits);
        this.precision.decimal = Math.max(0, decimalDigits);
    }

    roundToPrecision(numStr) {
        if (!numStr.includes('.')) {
            if (numStr.length > this.precision.integer) {
                return numStr.slice(0, this.precision.integer);
            }
            return numStr;
        }

        const [intPart, decPart] = numStr.split('.');
        let roundedInt = intPart;
        let roundedDec = decPart || '';

        if (roundedInt.length > this.precision.integer) {
            roundedInt = roundedInt.slice(0, this.precision.integer);
        }

        if (roundedDec.length > this.precision.decimal) {
            roundedDec = roundedDec.slice(0, this.precision.decimal);
        }

        return roundedDec ? `${roundedInt}.${roundedDec}` : roundedInt;
    }

    evaluate(input) {
        try {
            // 替换常数
            let expr = input
                .replace(/π/g, this.constants.pi)
                .replace(/e/g, this.constants.e);
            
            // 替换运算符
            expr = expr.replace(/÷/g, '/').replace(/×/g, '*');
            
            // 安全评估
            const result = this.safeEval(expr);
            return this.roundToPrecision(result.toString());
        } catch (error) {
            throw new Error('计算错误');
        }
    }

    safeEval(expr) {
        // 使用Function构造器代替eval更安全
        return new Function('return ' + expr)();
    }
}

class CalculatorUI {
    constructor() {
        this.calculator = new InfinityCalc();
        this.initElements();
        this.setupEventListeners();
        this.updateDisplay();
    }

    initElements() {
        this.display = document.querySelector('.result');
        this.expressionDisplay = document.querySelector('.expression');
        this.historyPanel = document.querySelector('.history-panel');
        this.intDigitsInput = document.getElementById('integer-digits');
        this.decDigitsInput = document.getElementById('decimal-digits');
        this.themeSelector = document.getElementById('theme-selector');
    }

    setupEventListeners() {
        // 按钮点击
        document.querySelectorAll('button').forEach(btn => {
            if (btn.dataset.val || btn.dataset.op) {
                btn.addEventListener('click', () => this.handleInput(btn.dataset.val || btn.dataset.op));
            } else if (btn.dataset.fn) {
                btn.addEventListener('click', () => this.handleFunction(btn.dataset.fn));
            } else if (btn.dataset.const) {
                btn.addEventListener('click', () => this.handleConstant(btn.dataset.const));
            }
        });

        // 键盘输入
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                this.handleInput(e.key);
            } else if (['+', '-', '*', '/', '.', 'Enter', 'Backspace'].includes(e.key)) {
                const mapping = {
                    '*': '×',
                    '/': '÷',
                    'Enter': '=',
                    'Backspace': '⌫'
                };
                this.handleInput(mapping[e.key] || e.key);
            }
        });

        // 精度设置
        this.intDigitsInput.addEventListener('change', () => {
            this.calculator.setPrecision(
                parseInt(this.intDigitsInput.value),
                this.calculator.precision.decimal
            );
        });

        this.decDigitsInput.addEventListener('change', () => {
            this.calculator.setPrecision(
                this.calculator.precision.integer,
                parseInt(this.decDigitsInput.value)
            );
        });

        // 主题切换
        this.themeSelector.addEventListener('change', () => {
            document.documentElement.setAttribute('data-theme', this.themeSelector.value);
        });
    }

    handleInput(input) {
        if (input === '=') {
            this.calculate();
        } else if (input === '⌫') {
            this.expression = this.expression.slice(0, -1);
        } else {
            this.expression += input;
        }
        this.updateDisplay();
    }

    handleFunction(fn) {
        switch(fn) {
            case 'clear':
                this.expression = '';
                this.display.textContent = '0';
                break;
            case 'sqrt':
                this.expression += 'Math.sqrt(';
                break;
            // 其他函数...
        }
        this.updateDisplay();
    }

    handleConstant(constant) {
        this.expression += constant;
        this.updateDisplay();
    }

    calculate() {
        try {
            const result = this.calculator.evaluate(this.expression);
            this.display.textContent = result;
            this.historyPanel.innerHTML = `<div>${this.expression} = ${result}</div>` + this.historyPanel.innerHTML;
            this.expression = result;
        } catch (error) {
            this.display.textContent = error.message;
        }
    }

    updateDisplay() {
        this.expressionDisplay.textContent = this.expression || '0';
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorUI();
});
class CalculusTools {
    static derivative(expr, variable) {
        // 简单符号微分规则
        const rules = [
            { pattern: new RegExp(`${variable}\\^([0-9]+)`), derivative: (match) => `${match[1]}*${variable}^${match[1]-1}` },
            { pattern: new RegExp(`sin\\(${variable}\\)`), derivative: `cos(${variable})` },
            { pattern: new RegExp(`cos\\(${variable}\\)`), derivative: `-sin(${variable})` },
            { pattern: new RegExp(`${variable}`), derivative: '1' }
        ];
        
        for (const rule of rules) {
            if (typeof rule.derivative === 'function') {
                if (rule.pattern.test(expr)) {
                    return expr.replace(rule.pattern, rule.derivative);
                }
            } else if (expr.match(rule.pattern)) {
                return expr.replace(rule.pattern, rule.derivative);
            }
        }
        
        return `无法求导: ${expr}`;
    }

    static integral(expr, variable, from, to) {
        // 简单积分规则
        if (expr === variable) {
            return from ? 
                `(1/2)*${variable}^2|${from}^${to}` : 
                `(1/2)*${variable}^2 + C`;
        }
        return `∫(${expr}) d${variable}`;
    }

    static limit(expr, variable, approach) {
        return `lim(${expr}) as ${variable}→${approach}`;
    }
}

class CalculusUI {
    constructor() {
        this.setupTabs();
        this.setupEventListeners();
    }

    setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
                
                tab.classList.add('active');
                const panelId = tab.dataset.tab;
                document.getElementById(panelId).classList.add('active');
            });
        });
    }

    setupEventListeners() {
        document.getElementById('calculate-deriv').addEventListener('click', () => {
            const expr = document.getElementById('deriv-expr').value;
            const variable = document.getElementById('deriv-var').value || 'x';
            const result = CalculusTools.derivative(expr, variable);
            document.getElementById('deriv-result').textContent = result;
        });

        document.getElementById('calculate-integral').addEventListener('click', () => {
            const expr = document.getElementById('integral-expr').value;
            const variable = document.getElementById('integral-var').value || 'x';
            const from = document.getElementById('integral-from').value;
            const to = document.getElementById('integral-to').value;
            const result = CalculusTools.integral(expr, variable, from, to);
            document.getElementById('integral-result').textContent = result;
        });

        document.getElementById('calculate-limit').addEventListener('click', () => {
            const expr = document.getElementById('limit-expr').value;
            const variable = document.getElementById('limit-var').value || 'x';
            const approach = document.getElementById('limit-approach').value || '0';
            const result = CalculusTools.limit(expr, variable, approach);
            document.getElementById('limit-result').textContent = result;
        });
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new CalculusUI();
});
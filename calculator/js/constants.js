class MathConstants {
    constructor() {
        this.constants = [
            {
                name: "圆周率",
                symbol: "π",
                value: this.calculatePi(100),
                category: "basic",
                desc: "圆的周长与直径之比"
            },
            {
                name: "自然对数的底",
                symbol: "e",
                value: this.calculateE(100),
                category: "basic",
                desc: "lim(n→∞)(1 + 1/n)^n"
            },
            // 添加更多常数...
        ];
    }

    calculatePi(digits) {
        // 使用BBP算法计算π
        let pi = '3.14159265358979323846264338327950288419716939937510';
        return this.extendDecimal(pi, digits);
    }

    calculateE(digits) {
        // 使用泰勒级数计算e
        let e = '2.71828182845904523536028747135266249775724709369995';
        return this.extendDecimal(e, digits);
    }

    extendDecimal(numStr, digits) {
        if (!numStr.includes('.')) return numStr;
        const [intPart, decPart] = numStr.split('.');
        if (decPart.length >= digits) return numStr;
        return intPart + '.' + decPart + '0'.repeat(digits - decPart.length);
    }

    search(query) {
        const q = query.toLowerCase();
        return this.constants.filter(c => 
            c.name.toLowerCase().includes(q) || 
            c.symbol.toLowerCase().includes(q));
    }

    filterByCategory(category) {
        return category === 'all' ? 
            this.constants : 
            this.constants.filter(c => c.category === category);
    }
}

class ConstantsUI {
    constructor() {
        this.constantsLib = new MathConstants();
        this.initElements();
        this.setupEventListeners();
        this.displayConstants(this.constantsLib.constants);
    }

    initElements() {
        this.searchInput = document.getElementById('constant-search');
        this.constantsList = document.querySelector('.constants-list');
        this.categoryButtons = document.querySelectorAll('.category-btn');
    }

    setupEventListeners() {
        this.searchInput.addEventListener('input', () => {
            const results = this.constantsLib.search(this.searchInput.value);
            this.displayConstants(results);
        });

        this.categoryButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.categoryButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const category = btn.dataset.category;
                const results = this.constantsLib.filterByCategory(category);
                this.displayConstants(results);
            });
        });
    }

    displayConstants(constants) {
        this.constantsList.innerHTML = constants.map(c => `
            <div class="constant-item">
                <h3>${c.name} (${c.symbol})</h3>
                <div class="constant-value">${c.value}</div>
                <p class="constant-desc">${c.desc}</p>
            </div>
        `).join('');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new ConstantsUI();
});
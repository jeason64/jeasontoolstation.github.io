import './math-core.js';
import './ui-handler.js';

// 全局导出（如果需要）
window.InfinityCalc = {
    calculator: calculator,
    init: function() {
        // 额外的初始化代码
    }
};

// 初始化计算器
document.addEventListener('DOMContentLoaded', window.InfinityCalc.init);
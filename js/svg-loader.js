// 动态生成SVG背景
document.addEventListener('DOMContentLoaded', function() {
    const svgBg = document.getElementById('svg-bg');
    
    // 创建SVG渐变
    const gradient = `
        <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4a6cf7" stop-opacity="0.1" />
                <stop offset="100%" stop-color="#6a8cff" stop-opacity="0.05" />
            </linearGradient>
        </defs>
    `;
    
    // 创建动态路径
    const paths = `
        <path class="float-path" d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100 C1150,200 1350,0 1440,100 L1440,600 L0,600 Z" />
        <path class="float-path" d="M0,200 C150,100 350,300 500,200 C650,100 850,300 1000,200 C1150,100 1350,300 1440,200 L1440,600 L0,600 Z" opacity="0.3" />
    `;
    
    svgBg.innerHTML = gradient + paths;
});
document.addEventListener('DOMContentLoaded', function() {
    // 移动端导航切换
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.main-nav');
    
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    // 导航指示器
    const navLinks = document.querySelectorAll('.main-nav a');
    const indicator = document.querySelector('.nav-indicator');
    
    function moveIndicator(el) {
        const width = el.offsetWidth;
        const left = el.offsetLeft;
        
        indicator.style.width = `${width}px`;
        indicator.style.left = `${left}px`;
    }
    
    // 初始化指示器位置
    const activeLink = document.querySelector('.main-nav a.active');
    if (activeLink) {
        moveIndicator(activeLink);
    }
    
    // 点击导航链接时移动指示器
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 更新active类
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // 移动指示器
            moveIndicator(this);
            
            // 如果是移动端，关闭菜单
            if (window.innerWidth <= 768) {
                nav.classList.remove('active');
            }
            
            // 滚动到对应区域
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 工具卡片数据
    const tools = [
        {
            title: "JSON格式化",
            description: "在线格式化JSON数据，支持压缩和美化",
            icon: "assets/svg/icons/json.svg"
        },
        {
            title: "Base64编码",
            description: "文本与Base64相互转换工具",
            icon: "assets/svg/icons/base64.svg"
        },
        {
            title: "二维码生成",
            description: "生成各种尺寸的二维码图片",
            icon: "assets/svg/icons/qrcode.svg"
        },
        {
            title: "颜色转换",
            description: "HEX、RGB、HSL颜色格式转换",
            icon: "assets/svg/icons/color.svg"
        },
        {
            title: "时间戳转换",
            description: "时间戳与日期时间相互转换",
            icon: "assets/svg/icons/time.svg"
        },
        {
            title: "正则测试",
            description: "在线测试正则表达式",
            icon: "assets/svg/icons/regex.svg"
        }
    ];
    
    // 生成工具卡片
    const toolsGrid = document.querySelector('.tools-grid');
    
    tools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'tool-card';
        
        // 使用占位图代替实际图标
        const placeholderColor = `hsl(${Math.random() * 360}, 70%, 80%)`;
        
        card.innerHTML = `
            <div style="background: ${placeholderColor}; height: 150px;"></div>
            <div class="tool-card-content">
                <h3>${tool.title}</h3>
                <p>${tool.description}</p>
                <a href="#" class="btn">立即使用</a>
            </div>
        `;
        
        toolsGrid.appendChild(card);
    });
    
    // 窗口大小改变时重新定位指示器
    window.addEventListener('resize', function() {
        const activeLink = document.querySelector('.main-nav a.active');
        if (activeLink) {
            moveIndicator(activeLink);
        }
    });
});
document.addEventListener('DOMContentLoaded', function() {
    // 确保 DOM 加载完成
    const navContainer = document.getElementById('nav-container');
    const menuToggle = document.getElementById('menu-toggle');

    if (!navContainer || !menuToggle) {
        console.error('导航容器或菜单按钮未找到！');
        return;
    }

    // 动态添加遮罩
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // 加载导航
    fetch('nav.html')
        .then(response => {
            if (!response.ok) throw new Error('无法加载 nav.html，状态码: ' + response.status);
            return response.text();
        })
        .then(data => {
            navContainer.innerHTML = data;
            highlightCurrentPage();

            // 导航切换
            menuToggle.addEventListener('click', function() {
                const isActive = navContainer.classList.toggle('active');
                overlay.classList.toggle('active', isActive);
                this.textContent = isActive ? '✖' : '☰';
            });

            // 点击遮罩或外部关闭
            document.addEventListener('click', function(e) {
                if (!navContainer.contains(e.target) && e.target !== menuToggle && !overlay.contains(e.target)) {
                    navContainer.classList.remove('active');
                    overlay.classList.remove('active');
                    menuToggle.textContent = '☰';
                }
            });
        })
        .catch(error => console.error('加载导航失败:', error));

    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.main-nav a, .sub-nav a');
        links.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
});
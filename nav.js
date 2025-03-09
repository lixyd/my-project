document.addEventListener('DOMContentLoaded', function() {
    // 动态创建遮罩层
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // 加载导航
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const navContainer = document.getElementById('nav-container');
            navContainer.innerHTML = data;
            highlightCurrentPage();

            // 导航切换逻辑
            const menuToggle = document.getElementById('menu-toggle');
            menuToggle.addEventListener('click', function() {
                const isActive = navContainer.classList.toggle('active');
                overlay.classList.toggle('active', isActive);
                this.textContent = isActive ? '✖' : '☰';
            });

            // 点击遮罩或外部关闭导航
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
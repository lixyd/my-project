document.addEventListener('DOMContentLoaded', function() {
    // 动态添加遮罩
    const overlay = document.createElement('div');
    overlay.id = 'overlay';
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // 加载导航
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-container').innerHTML = data;
            highlightCurrentPage();

            // 导航切换
            const menuToggle = document.getElementById('menu-toggle');
            menuToggle.addEventListener('click', function() {
                const isActive = document.getElementById('nav-container').classList.toggle('active');
                overlay.classList.toggle('active', isActive);
                this.textContent = isActive ? '✖' : '☰';
            });

            // 点击遮罩关闭
            document.addEventListener('click', function(e) {
                const navContainer = document.getElementById('nav-container');
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
            if (link.getAttribute('href') === currentPage) link.classList.add('active');
        });
    }
});
window.onload = function() {
    const page = window.location.pathname.split('/').pop(); // 获取当前文件名（如spring.html）
    const viewKey = `views_${page}`;
    let views = parseInt(localStorage.getItem(viewKey)) || 0;
    views += 1; // 每次访问加1
    localStorage.setItem(viewKey, views);
    document.getElementById('view-count').innerText = views;
};
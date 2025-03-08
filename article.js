document.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split('/').pop(); // 获取当前页面文件名
    const key = `article_${page}`;
    const now = new Date().toLocaleString(); // 当前时间

    // 初始化或读取数据
    let articleData = JSON.parse(localStorage.getItem(key)) || {
        publishTime: now,
        readCount: 0
    };

    // 增加阅读次数
    articleData.readCount += 1;
    localStorage.setItem(key, JSON.stringify(articleData));

    // 显示数据
    document.getElementById('publish-time').innerText = articleData.publishTime;
    document.getElementById('read-count').innerText = articleData.readCount;
});
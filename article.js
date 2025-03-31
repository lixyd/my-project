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

    // 留言功能
    const commentKey = `comments_${page}`;
    const comments = JSON.parse(localStorage.getItem(commentKey)) || [];

    function renderComments() {
        const commentList = document.querySelector('.comment-list');
        commentList.innerHTML = '';
        comments.slice(-3).forEach((comment, index) => {
            const li = document.createElement('li');
            const randomColor = getRandomColor();
            li.innerHTML = `
                <span class="comment-text" style="background-color: ${randomColor}; width: calc(${comment.text.length}ch + 20px);">
                    ${comment.text}
                </span>
                <button class="like-btn ${comment.liked ? 'liked' : ''}" data-index="${index}">
                    ${comment.liked ? '取消点赞' : '点赞'}
                </button>
            `;
            commentList.appendChild(li);
        });
    }

    function getRandomColor() {
        const colors = ['#e8f5e9', '#f1f8e9', '#f9fbe7', '#fffde7', '#fff3e0', '#dcedc8', '#c8e6c9', '#b2dfdb'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    document.querySelector('.comment-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const input = document.querySelector('.comment-input');
        const text = input.value.trim();
        if (text) {
            comments.push({ text, liked: false });
            localStorage.setItem(commentKey, JSON.stringify(comments));
            input.value = '';
            renderComments();
        }
    });

    document.querySelector('.comment-list').addEventListener('click', function (e) {
        if (e.target.classList.contains('like-btn')) {
            const index = e.target.dataset.index;
            comments[index].liked = !comments[index].liked;
            localStorage.setItem(commentKey, JSON.stringify(comments));
            renderComments();
        }
    });

    renderComments();
});
// 页面加载时显示已有留言
window.onload = function() {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.forEach(comment => createComment(comment));
};

// 监听表单提交
document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const input = document.getElementById('comment-input');
    let comment = input.value.trim();
    if (comment) {
        comment = comment.substring(0, 8);
        createComment(comment);
        saveComment(comment);
        input.value = '';
    }
});

// 创建留言模块
function createComment(text) {
    const container = document.getElementById('comment-container');
    const commentBlock = document.createElement('div');
    commentBlock.className = 'comment-block';
    commentBlock.innerText = text;

    // 长按事件
    let pressTimer;
    commentBlock.addEventListener('mousedown', startPress);
    commentBlock.addEventListener('touchstart', startPress); // 支持移动端触摸
    commentBlock.addEventListener('mouseup', clearPress);
    commentBlock.addEventListener('touchend', clearPress);
    commentBlock.addEventListener('mouseleave', clearPress);
    commentBlock.addEventListener('touchcancel', clearPress);

    function startPress(e) {
        e.preventDefault();
        pressTimer = setTimeout(() => {
            const password = prompt('请输入管理员密码以删除此留言：');
            if (password === 'leey123') { // 你的密码
                container.removeChild(commentBlock);
                removeComment(text);
                alert('留言已删除');
            } else {
                alert('密码错误，无权限删除！');
            }
        }, 1000); // 长按1秒触发
    }

    function clearPress() {
        clearTimeout(pressTimer);
    }

    // 随机颜色
    const colors = [
        '#e8f5e9', '#f1f8e9', '#f9fbe7', '#fffde7', '#fff3e0',
        '#dcedc8', '#c8e6c9', '#b2dfdb'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    commentBlock.style.backgroundColor = randomColor;

    container.appendChild(commentBlock);
}

// 保存留言到 localStorage
function saveComment(text) {
    const savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments.push(text);
    localStorage.setItem('comments', JSON.stringify(savedComments));
}

// 从 localStorage 删除留言
function removeComment(text) {
    let savedComments = JSON.parse(localStorage.getItem('comments')) || [];
    savedComments = savedComments.filter(comment => comment !== text);
    localStorage.setItem('comments', JSON.stringify(savedComments));
}
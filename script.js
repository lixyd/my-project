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
    
    const textSpan = document.createElement('span');
    textSpan.innerText = text;
    commentBlock.appendChild(textSpan);

    // 添加删除按钮
    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = '删除';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        const password = prompt('请输入管理员密码：');
        if (password === 'leey123') { // 设置你的密码
            container.removeChild(commentBlock);
            removeComment(text);
        } else {
            alert('密码错误，无权限删除！');
        }
    };
    commentBlock.appendChild(deleteBtn);

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
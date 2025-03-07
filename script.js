document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交
    const input = document.getElementById('comment-input');
    const comment = input.value.trim();
    if (comment) {
        createBarrage(comment); // 创建弹幕
        input.value = ''; // 清空输入框
    }
});

function createBarrage(text) {
    const container = document.getElementById('barrage-container');
    const barrage = document.createElement('span');
    barrage.className = 'barrage';
    barrage.innerText = text;

    // 随机位置和速度
    const top = Math.random() * 80 + 10; // 10%到90%的高度
    const duration = Math.random() * 5 + 5; // 5到10秒动画
    barrage.style.top = `${top}%`;
    barrage.style.animationDuration = `${duration}s`;

    container.appendChild(barrage);

    // 删除过期的弹幕
    setTimeout(() => {
        barrage.remove();
    }, duration * 1000);
}
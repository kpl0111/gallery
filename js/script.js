let isFullScreen = false; // 追踪全屏状态

function changeBackground(imagePath) {
    const img = new Image();
    img.src = imagePath;
    img.onload = function () {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(img, 3); // 提取图像的前三种颜色
        const gradient = `linear-gradient(to bottom right, rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]}), rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]}), rgb(${colors[2][0]}, ${colors[2][1]}, ${colors[2][2]})`;

        document.body.style.background = gradient;
    };
}

function resetBackground() {
    document.body.style.background = '#E5E5E5'; // 恢复亚克力色背景
}

// 双击图片时触发
function toggleFullScreen(img) {
    const overlay = document.getElementById('overlay');
    
    if (img.classList.contains('full-screen-enabled')) {
        // Exiting full screen
        img.classList.remove('full-screen-enabled');
        img.style.pointerEvents = 'auto'; // 恢复鼠标事件
        overlay.style.display = 'none';
        isFullScreen = false;
    } else {
        // Entering full screen
        img.classList.add('full-screen-enabled');
        img.style.pointerEvents = 'none'; // 禁用鼠标事件
        overlay.style.display = 'block';
        isFullScreen = true;
    }
}


function disableAllImagesExcept(selectedImg) {
    document.querySelectorAll('img').forEach(img => {
        if (img !== selectedImg) {
            img.style.pointerEvents = 'none'; // 禁用非全屏图片的点击事件
        }
    });
}

function enableAllImages() {
    document.querySelectorAll('img').forEach(img => {
        img.style.pointerEvents = 'auto'; // 启用所有图片的点击事件
    });
}

// 点击覆盖层时取消全屏效果
document.getElementById('overlay').addEventListener('click', function() {
    const fullScreenImgs = document.querySelectorAll('.full-screen-enabled');
    fullScreenImgs.forEach(img => {
        img.classList.remove('full-screen-enabled');
        img.style.pointerEvents = 'auto'; // 恢复鼠标事件
    });
    this.style.display = 'none';
    isFullScreen = false;
});


// 点击覆盖层时取消全屏效果
overlay.addEventListener('click', function() {
    const fullScreenImgs = document.querySelectorAll('.full-screen-enabled');
    fullScreenImgs.forEach(img => img.classList.remove('full-screen-enabled'));
    this.style.display = 'none';
});
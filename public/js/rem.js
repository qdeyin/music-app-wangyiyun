function remSize() {
    // 获取设备的宽度
    const deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 750) {
        deviceWidth = 750
    }
    if (deviceWidth <= 320) {
        deviceWidth = 320
    }
    // 750px -- 1rem = 100px 320px -- 1rem = 50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
    // 设置body 标签的字体大小
    document.querySelector('body').style.fontSize = 0.3 + 'rem'
}
remSize()
// 当窗口发生变化时 就调用
window.onresize = function () {
    remSize()
}
<!-- 头部导航组件 -->
<template>
    <div class="topNav">
        <!-- 汉堡按钮 -->
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-hanbaocaidan"></use>
        </svg>
        <!-- 导航栏菜单 -->
        <div class="navContent">
            <span @click="$router.push('/userinfo')">我的</span>
            <span class="active">发现</span>
            <span>云村</span>
            <span>视频</span>
        </div>
        <!-- 搜索按钮 -->
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
            <use xlink:href="#icon-sousuo"></use>
        </svg>
    </div>
</template>
<style lang="less" scoped>
.topNav {
    width: 100%;
    height: 1rem;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navContent {
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        // align-items: center;
        font-size: .36rem;
        .active {
            font-weight: 900;
        }
    }
}
</style>
<template>
    <!-- 歌单详情页顶部 -->
    <div class="itemMusicTop">
        <!-- 背景图片 -->
        <img :src="playlist.coverImgUrl" alt="" class="bgimg">
        <div class="itemLeft">
            <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg>
            <span>歌单</span>
        </div>
        <div class="itemRight">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-hanbaocaidan"></use>
            </svg>
        </div>
    </div>
    <div class="itemTopContent">
        <div class="contentLeft">
            <img :src="playlist.coverImgUrl" alt="" class="imgdetail">
            <div class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-play"></use>
                </svg>
                <span>{{ changeCount(playlist.playCount) }}</span>
            </div>
        </div>
        <div class="contentRight">
            <p class="rightP_One">{{ playlist.name }}</p>
            <div class="right_img">
                <img :src="playlist.creator.backgroundUrl" alt="">
                <span>{{ playlist.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
            </div>
            <p class="rightP_Two">
                <span>{{ playlist.description }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg>
            </p>
        </div>
    </div>
    <div class="itemTopFooter">
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiaoxi"></use>
            </svg>
            <span>{{ playlist.commentCount }}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg>
            <span>{{ playlist.shareCount }}</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiazai-wenjianxiazai-07"></use>
            </svg>
            <span>下载</span>
        </div>
        <div class="footerItem">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg>
            <span>多选</span>
        </div>
    </div>

</template>
<script>
export default {
    setup(props) {
        // console.log(props)
        // 通过props进行传值，判断如果数据拿不到，就获取sessionStorage中的
        // props.playlist.creator = ""
        if((props.playlist.creator = "")){
            props.playlist.creator = JSON.parse(sessionStorage.getItem().playlist.creator)
        }
    },
    props: ["playlist"],
    methods: {
        // 获取播放量并转换
        changeCount(num) {
            if (num > 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num > 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
    }
}
</script>
<style lang="less" scoped>
.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .itemLeft,
    .itemRight {
        width: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 .2rem;

        .icon {
            fill: #fff;
        }

        span {
            font-size: .4rem;
            color: white;
        }
    }

    .bgimg {
        width: 100%;
        height: 11rem;
        position: absolute;
        filter: blur(0.5rem);
        z-index: -1;
    }
}

.itemTopContent {
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;

    .contentLeft {
        width: 36%;
        height: 2.6rem;
        position: relative;

        img {
            width: 2.6rem;
            height: 2.6rem;
            border-radius: 0.2rem;
            position: absolute;
            z-index: -1;
        }

        .playCount {
            position: absolute;
            margin-top: 0.1rem;
            right: 0.1rem;

            .icon {
                width: 0.26rem;
                height: 0.26rem;
                margin-top: -0.02rem;
                vertical-align: middle;
                fill: #fff;
            }
        }

        span {
            font-size: 0.26rem;
            color: white;
        }
    }

    .contentRight {
        width: 60%;
        height: 2.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .rightP_One {
            font-size: 0.3rem;
            font-weight: 900;
            color: #fff;
            font-family: "微软雅黑";
        }

        .right_img {
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            color: #ccc;

            img {
                width: 0.6rem;
                height: 0.6rem;
                border-radius: 50%;
                vertical-align: middle;
            }

            span {
                margin-left: 0.1rem;
            }

            .icon {
                width: 0.26rem;
                height: 0.26rem;
                margin-top: -0.08rem;
                vertical-align: middle;
                fill: #fff;
            }
        }

        .rightP_Two {
            width: 100%;
            height: 0.6rem;
            display: flex;
            align-items: center;
            justify-content: space-between;

            span {
                width: 95%;
                height: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                font-size: 0.24rem;
                color: #ccc;
            }

            .icon {
                width: 0.26rem;
                height: 0.26rem;
                margin-top: -0.08rem;
                vertical-align: middle;
                fill: #fff;
            }
        }
    }
}

.itemTopFooter {
    width: 100%;
    height: 1.4rem;
    display: flex;
    justify-content: space-around;
    margin-top: 0.2rem;

    .footerItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #fff;

        .icon {
            fill: #fff;
            
        }

        span {
            margin-top: 0.1rem;
        }
    }
}
</style>
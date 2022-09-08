<!-- 音乐列表 -->
<template>
    <div class="musiclist">
        <div class="musictop">
            <div class="title">发现好歌单</div>
            <div class="more">查看更多</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="120" class="my-swipe" :show-indicators="false">
                <van-swipe-item v-for="item in musicList" :key="item" class="swipeitem">
                    <router-link :to="{ path: '/itemmusic', query:{ id: item.id } }">
                        <img :src="item.picUrl" alt="">
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-24gl-play"></use>
                            </svg>
                            {{ changeCount(item.playCount) }}
                        </span>
                        <span class="name">
                            {{ item.name }}
                        </span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>

    </div>
</template>
<script>
import { getMusicList } from '@/request/api/home.js'
export default {
    data() {
        return {
            musicList: [],
        }
    },
    mounted() {
        this.getGedan()
    },
    methods: {
        async getGedan() {
            let res = await getMusicList()
            console.log(res)
            this.musicList = res.data.result
            console.log(this.musicList)
        },
        changeCount: function (num) {
            if (num > 100000000) {
                return (num / 100000000).toFixed(1) + '亿'
            } else if (num > 10000) {
                return (num / 10000).toFixed(1) + '万'
            }
        }
    },

}
</script>
<style lang="less" scoped>
.musiclist {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;

    .musictop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }

        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }

    .musicContent {
        width: 100%;
        height: 4rem;

        .my-swipe {
            height: 100%;
            position: relative;

            .swipeitem {
                padding: 0 .08rem;
            }

            img {
                width: 100%;
                height: 2.4rem;
                border-radius: 0.2rem;
            }

            .playCount {
                position: absolute;
                right: 0.3rem;
                color: white;
                margin-top: 0.06rem;

                .icon {
                    width: 0.3rem;
                    height: 0.3rem;
                }
            }
        }
    }
}
</style>
<template>
    <div class="itemMusicList">
        <div class="itemListTop">
            <div class="listLeft">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-24gl-playCircle"></use>
                </svg>
                <span>播放全部<p>(共{{ itemList.length }}首)</p></span>
            </div>
            <div class="listRight">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-jiahao1"></use>
                </svg>
                <span>收藏({{ subscribedCount }})</span>
            </div>
        </div>
        <div class="itemList">
            <div class="item" v-for="(item, index) in itemList" :key="index">
                <div class="itemLeft" @click="playMusic(index)">
                    <span class="leftSpan">{{ index + 1 }}</span>
                    <div>
                        <p>{{ item.name }}</p>
                        <span v-for="(item1, index1) in item.ar" :key="index1">{{ item1.name }}</span>
                    </div>
                </div>
                <div class="itemRight">
                    <svg class="icon shipin" aria-hidden="true" v-if="item.mv != '0'">
                        <use xlink:href="#icon-shipin"></use>
                    </svg>
                    <svg class="icon liebiao" aria-hidden="true">
                        <use xlink:href="#icon-hanbaocaidan"></use>
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'

export default {
    setup(props) {
        // console.log(props)
    },
    props: ["itemList", "subscribedCount"],
    methods: {
        playMusic: function (i) {
            this.updatePlayList(this.itemList)
            this.updatePlayListIndex(i)
        },
        ...mapMutations(["updatePlayList", "updatePlayListIndex"]),
    },

}
</script>
<style lang="less" scoped>
.itemMusicList {
    width: 100%;
    height: 10rem;
    background-color: #fff;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    border-top-left-radius: 0.4rem;
    border-top-right-radius: 0.4rem;

    .itemListTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .listLeft {
            width: 42%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            span {
                font-weight: 700;

                p {
                    display: inline-block;
                    font-weight: 400;
                    font-size: 0.24rem;
                    color: #999;
                }
            }

            .icon {
                stroke: #333333;
                stroke-width: 20;
            }
        }

        .listRight {
            display: flex;
            align-items: center;
            background-color: red;
            padding: 0.2rem;
            border-radius: 0.4rem;
            color: #fff;

            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: #fff;
                margin-right: 0.1rem;
                stroke: #fff;
                stroke-width: 50;
            }

        }

    }

    .itemList {
        width: 100%;

        .item {
            width: 100%;
            height: 1.4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .itemLeft {
                width: 85%;
                height: 100%;
                display: flex;
                align-items: center;

                .leftSpan {
                    display: inline-block;
                    width: 0.2rem;
                    text-align: center;
                }

                div {
                    margin-left: 0.3rem;

                    p {
                        height: 0.4rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        font-weight: 700;
                    }

                    span {
                        font-weight: 400;
                        font-size: 0.24rem;
                        color: #999;
                    }
                }
            }

            .itemRight {
                width: 20%;
                height: 100%;
                display: flex;
                align-items: center;
                position: relative;

                .liebiao {
                    position: absolute;
                    right: 0;
                }

                .bofang {
                    position: absolute;
                    left: 0;
                }
            }
        }
    }
}
</style>
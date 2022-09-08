<template>
    <div class="musicDetail">
        <img :src="musicList.al.picUrl" alt="" class="bg_img">
        <div class="detailTop">
            <div class="detailTopLeft">
                <svg class="icon bg_fill" aria-hidden="true" @click="backhome">
                    <use xlink:href="#icon-zuojiantou"></use>
                </svg>
                <div class="leftMarquee">
                    <Vue3Marquee style="color:white">{{ musicList.al.name }}</Vue3Marquee>
                    <div class="leftauthor">
                        <span v-for="(item, i) in musicList.ar" :key="i"> {{ item.name }}
                        </span>
                        <svg class="icon youjiantou1" aria-hidden="true">
                            <use xlink:href="#icon-youjiantou1"></use>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="detailTopRight">
                <svg class="icon bg_fill" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
            </div>
        </div>
        <div class="detailContent" v-show="!isLyricShow" @click="isLyricShow = true">
            <img src="@/assets/needle-ab.png" alt="" :class="[isbtnShow ? 'img_needle_ab' : 'img_needle_active']">
            <img src="@/assets/cd.png" alt="" class="img_cd">
            <img :src="musicList.al.picUrl" alt="" class="img_al"
                :class="[isbtnShow ? 'img_al_pauesd' : 'img_al_active']">
        </div>
        <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow = false">
            <!-- {{lyric }}     -->
            <p v-for="item in lyric" :key="item"
                :class="[currentTime * 1000 >= item.time && currentTime * 1000 < item.pre ? 'active' : '']">
                {{ item.lrc }}
                <!-- {{currentTime}} -->
            </p>
        </div>
        <div class="detailfooter">
            <div class="footerTop">
                <svg class="icon " aria-hidden="true">
                    <use xlink:href="#icon-xihuan"></use>
                </svg>
                <svg class="icon " aria-hidden="true">
                    <use xlink:href="#icon-xiazai"></use>
                </svg>
                <svg class="icon " aria-hidden="true">
                    <use xlink:href="#icon-yinle"></use>
                </svg>
                <svg class="icon " aria-hidden="true">
                    <use xlink:href="#icon-xinxi"></use>
                </svg>
                <svg class="icon " aria-hidden="true">
                    <use xlink:href="#icon-liebiao-"></use>
                </svg>
            </div>
            <div class="footerContent">
                <p class="begin">{{ formDuration(currentTime) }}</p>
                <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
                <p class="end">{{ formDuration(duration) }}</p>
            </div>
            <div class="footer">
                <svg class="icon " aria-hidden="true">
                    <use xlink:href="#icon-xunhuan"></use>
                </svg>
                <svg class="icon " aria-hidden="true" @click="goPlay(-1)">
                    <use xlink:href="#icon-shangyishoushangyige"></use>
                </svg>
                <svg class="icon bofang" aria-hidden="true" v-if="isbtnShow" @click="play">
                    <use xlink:href="#icon-bofang2"></use>
                </svg>
                <svg class="icon bofang" aria-hidden="true" v-else @click="play">
                    <use xlink:href="#icon-zanting-m"></use>
                </svg>
                <svg class="icon " aria-hidden="true" @click="goPlay(1)">
                    <use xlink:href="#icon-xiayigexiayishou"></use>
                </svg>
                <svg class="icon " aria-hidden="true">
                    <use xlink:href="#icon-zu"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
import { Vue3Marquee } from "vue3-marquee";
import "vue3-marquee/dist/style.css";
import { mapMutations, mapState } from "vuex";
export default {
    data() {
        return {
            // 歌词默认为不显示
            isLyricShow: false
        }
    },
    computed: {
        ...mapState(["lyricList", "currentTime", "playListIndex", "playList", "duration"]),
        lyric: function () {
            let arr;
            if (this.lyricList.lyric) {
                arr = this.lyricList.lyric.split(/[\r\n]+/).map((item, i) => {
                    // console.log(item)
                    let min = item.slice(item.indexOf('[') + 1, 3);
                    // let min = parseInt(item.match(/\d{2}(?=:)/gm))
                    let sec = item.slice(4, item.indexOf('.'));
                    let mill = item.slice(7, item.indexOf(']'));
                    let lrc = item.slice(item.indexOf(']') + 1, item.length);
                    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
                    // console.log(min, sec, mill,)
                    // console.log(time)
                    return { min, sec, mill, lrc, time };
                });
                arr.forEach((item, i) => {
                    // 
                    if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
                        item.pre = 100000;
                    } else {
                        item.pre = arr[i + 1].time;
                    }
                });
            }
            // console.log(arr);
            return arr;
        },
    },
    mounted() {
        // console.log(this.musicList)
        // console.log(this.lyricList.lyric)
        // console.log(this.currentTime)
        this.addDuration()

    },
    props: ["musicList", "play", "isbtnShow", "addDuration"],
    methods: {
        backhome: function () {
            this.isLyricShow = false
            this.updateDetailShow()
        },

        goPlay: function (num) {
            let index = this.playListIndex + num
            if (index < 0) {
                index = this.playList.length - 1
            }
            else if (index == this.playList.length) {
                index = 0
            }
            this.updatePlayListIndex(index)
        },
        formDuration: function (time) {
            let min = (time / 60).toFixed(0)
            let sec = (time % 60).toFixed(0)
            if (min < 10) {
                min = '0' + min
            }
            if (sec < 10) {
                sec = '0' + sec
            }
            let formTime = `${min}:${sec}`
            return formTime
        },
        ...mapMutations(["updateDetailShow", "updatePlayListIndex"]),
    },

    watch: {
        currentTime: function (newValue) {

            let p = document.querySelector("p.active")
            let index = this.playListIndex
            // console.log([this.$refs.musicLyric])
            if (p) {
                this.$refs.musicLyric.scrollTop = p.offsetTop - 250;
            }
            if (newValue === this.duration) {

                if (index === this.playList.length - 1) {
                    this.updatePlayListIndex(0)
                    this.play()
                } else {
                    this.updatePlayListIndex(index + 1)
                }
            }
        }
    },
    components: {
        Vue3Marquee,
    },
}
</script>
<style lang="less" scoped>
.musicDetail {
    width: 100%;
    height: 100%;
    padding: .2rem;

    // position: relative;
    .bg_img {
        width: 100%;
        height: 100%;
        filter: blur(60px);
        position: absolute;
        z-index: -1;
    }

    .detailTop {
        width: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: .2rem;
        fill: #fff;

        .detailTopLeft {
            display: flex;
            align-items: center;

            .leftMarquee {
                width: 80%;
                height: 100%;
                margin-left: 0.4rem;

                .leftauthor {
                    display: flex;
                    align-items: center;

                    span {
                        color: #999;
                        padding-left: .1rem;
                    }

                    .youjiantou1 {
                        width: 0.3rem;
                        height: 0.3rem;
                        fill: #999;
                    }
                }


            }
        }

        .detailTopRight {
            width: 10%;
            height: 100%;
            display: flex;
            align-items: center;
        }

        .bg_fill {
            fill: #fff;
        }
    }

    .musicLyric {
        width: 100%;
        height: 8rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.2rem;
        overflow: scroll;

        p {
            color: rgb(190, 181, 181);
            margin-bottom: 0.3rem;

        }

        .active {
            color: #fff;
            // font-size: 0.5rem;

        }
    }

    .detailContent {
        width: 100%;
        height: 9rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;

        .img_needle_ab {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            // 设置变换的原点为左上角
            transform-origin: 0 0;
            transform: rotate(-13deg);
            transition: all 2s;
        }

        .img_needle_active {
            width: 2rem;
            height: 3rem;
            position: absolute;
            left: 46%;
            transform-origin: 0 0;
            transform: rotate(0deg);
            transition: all 2s;
        }

        .img_cd {
            width: 5rem;
            height: 5rem;
            position: absolute;
            bottom: 2.3rem;
            z-index: -1;
        }

        .img_al {
            width: 3.2rem;
            height: 3.2rem;
            border-radius: 50%;
            position: absolute;
            bottom: 3.14rem;
            animation: rotate_ar 10s linear infinite;
        }

        .img_al_active {
            animation-play-state: running;
        }

        .img_al_pauesd {
            animation-play-state: paused;
        }

        @keyframes rotate_ar {
            0% {
                transform: rotateZ(0deg);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }
    }

    .detailfooter {
        width: 100%;
        height: 3rem;
        position: absolute;
        bottom: 0.2rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-left: -0.2rem;

        .footerContent {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .range {
                width: 100%;
                height: 0.06rem;
            }

            .begin {
                padding-left: 10px;
                color: #fff;
                font-size: 10px;
            }

            .end {
                padding-right: 10px;
                color: rgb(242, 233, 233);
                font-size: 10px;
            }
        }

        .footerTop,
        .footer {
            width: 100%;
            height: 1rem;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .icon {
                width: 0.6rem;
                height: 0.6rem;
                fill: #fff;
            }

            .bofang {
                width: 1rem;
                height: 1rem;
            }
        }

    }
}
</style>
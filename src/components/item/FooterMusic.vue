<template>
    <div class="footerMusic" >
        <div class="footerLeft" @click="updateDetailShow">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{ playList[playListIndex].name }}</p>
                <span>横滑可以切换上下首哦</span>
            </div>
        </div>
        <div class="footerRight">
            <svg class="icon " aria-hidden="true" @click="play" v-if="isbtnShow">
                <use xlink:href="#icon-24gl-playCircle"></use>
            </svg>
            <svg class="icon" aria-hidden="true" @click="play" v-else>
                <use xlink:href="#icon-weibiaoti--"></use>
            </svg>
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg>
        </div>
        <audio @timeupdate="updateTime" ref="audio"
            :src="` https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`"></audio>
        <van-popup v-model:show="detailShow" position="right" :style="{ height: '100%', width: '100%' }">
            <MusicDetail :musicList="playList[playListIndex]" :play="play" :isbtnShow="isbtnShow" :addDuration="addDuration"></MusicDetail>
        </van-popup>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState(["playList", "playListIndex", "isbtnShow", "detailShow", "currentTime", "duration"]),
    },
    mounted() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
        this.updateTime()

    },
    updated() {
        this.$store.dispatch("getLyric", this.playList[this.playListIndex].id)
        this.addDuration()
    },
    methods: {
        play: function () {
            // console.log([this.$refs.audio])
            // 判断音乐是否播放
            if (this.$refs.audio.paused) {
                this.$refs.audio.play()
                this.updateIsbtnShow(false)
                this.updateTime()
            } else {
                this.$refs.audio.pause()
                this.updateIsbtnShow(true);

            }
        },
        updateTime: function () {
            // this.intTime = setInterval(()=>{
            //     this.updateCurrentTime(this.$refs.audio.currentTime)
            // },1000)
            this.updateCurrentTime(this.$refs.audio.currentTime)
            // console.log(this.$refs.audio.currentTime)
        },
        addDuration: function () {
            this.updateDuration(this.$refs.audio.duration)
            // console.log(this.$refs.audio.duration)
        },
        ...mapMutations([
            "updateIsbtnShow",
            "updateDetailShow",
            "updateCurrentTime",
            "updateDuration",
        ])
    },
    watch: {
        playListIndex: function () {
            this.$refs.audio.autoplay = true
            if (this.$refs.audio.paused) {
                this.updateIsbtnShow(false)
            }
        },
        playList: function () {
            if (this.isbtnShow) {
                this.$refs.audio.autoplay = true
                this.updateIsbtnShow(false)
            }
        }
    },
    components: {
        MusicDetail,
    }
}
</script>
<style lang="less" scoped>
.footerMusic {
    width: 100%;
    height: 1.3rem;
    background-color: #fff;
    border-top: .02rem solid #ccc;
    padding: 0 .2rem 0 0;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .footerLeft {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;

        img {
            width: 1rem;
            height: 1rem;
            border-radius: 50%;
        }

        div {
            span {
                font-weight: 400;
                font-size: 0.24rem;
                color: #999;
            }
        }
    }

    .footerRight {
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .icon {
            width: 0.6rem;
            height: 0.6rem;
        }
    }
}
</style>
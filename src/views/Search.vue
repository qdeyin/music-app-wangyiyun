<template>
    <div class="searchTop">
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg>
        <input class="text" type="text" name="text" placeholder="古巨基" v-model="searchKey" @keyup.enter="enterKey">
        <button class="buttonSearch" @click="enterKey">搜索</button>
    </div>
    <div class="searchHistory">
        <div class="historyContent">
            <span class="lishi">历史</span>
            <svg class="icon" aria-hidden="true" @click="disHistory">
                <use xlink:href="#icon-shanchu"></use>
            </svg>
        </div>
        <span class="historyKey" v-for="item in searchWordList" :key="item" @click="searchMusic(item)"> {{ item
        }}</span>
    </div>
    <div class="itemList">
        <div class="item" v-for="(item, index) in searchMusicList" :key="index">
            <div class="itemLeft" @click="updateIndex(item)">
                <span class="leftSpan">{{ index + 1 }}</span>
                <div>
                    <p>{{ item.name }}</p>
                    <span v-for="(item1, index1) in item.artists" :key="index1">{{ item1.name }}</span>
                </div>
            </div>
            <div class="itemRight">
                <svg class="icon shipin" aria-hidden="true" v-if="item.mvid != '0'">
                    <use xlink:href="#icon-shipin"></use>
                </svg>
                <svg class="icon liebiao" aria-hidden="true">
                    <use xlink:href="#icon-hanbaocaidan"></use>
                </svg>
            </div>
        </div>
    </div>
</template>
<script>
import { getSearchMusic } from '@/request/api/home.js'
export default {
    data() {
        return {
            searchWordList: [], //搜索关键词列表
            searchKey: "", //输入框里面的关键词
            searchMusicList: [],//搜索关键词获得的列表
        }
    },
    mounted() {
        this.searchWordList = JSON.parse(localStorage.getItem("searchWordList"))
            ? JSON.parse(localStorage.getItem("searchWordList"))
            : [];
    },
    methods: {
        enterKey: function () {
            // console.log(this.searchKey)
            if (this.searchKey.replace(/^ +| +$/g, '') !== '') {
                this.searchKey = this.searchKey.replace(/\s+/g, "")
                console.log(this.searchKey)
                this.searchWordList.unshift(this.searchKey)
                console.log([new Set(this.searchWordList)])
                // this.searchWordList =  [...new Set(this.searchWordList)]
                this.searchWordList = [...new Set(this.searchWordList)]
                localStorage.setItem("searchWordList", JSON.stringify(this.searchWordList))
                this.searchKey = ""
            }
        },
        disHistory: function () {
            localStorage.removeItem("searchWordList")
            this.searchWordList = []
        },
        searchMusic: async function (item) {
            let res = await getSearchMusic(item)
            console.log(res)
            this.searchMusicList = res.data.result.songs
            console.log(this.searchMusicList)
        },
        updateIndex:function(item){
        item.al=item.album
        item.al.picUrl=item.album.artist.img1v1Url
        this.$store.commit("pushPlayList",item)
        this.$store.commit("updatePlayListIndex",this.$store.state.playList.length-1) 
    }
    }
}
</script>
<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: .2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .text {
        margin: 0 0.2rem;
        width: 75%;
        border: 0.04rem solid #999;
        border-radius: 0.2rem;
    }

    .buttonSearch {
        background-color: #fff;
        border: none;
    }
}

.searchHistory {
    width: 100%;

    .historyContent {
        margin: 0 .2rem 0 .2rem;
        display: flex;
        justify-content: space-between;

        span {
            font-weight: 700;
        }

        .icon {
            width: .4rem;
            height: .4rem;
        }
    }

    .historyKey {
        color: rgb(251, 247, 247);
        display: inline-block;
        background-color: rgb(215, 207, 207);
        border: 1px solid rgb(215, 207, 207);
        border-radius: 0.2rem;
        margin: 0.1rem;
        padding: 0.04rem 0.2rem;
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
</style>
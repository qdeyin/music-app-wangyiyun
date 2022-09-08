<template>
    <item-music-top :playlist="state.playlist"/>
    <ItemMusicList :itemList="state.itemList" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
</template>
<script>
import ItemMusicTop from '@/components/item/ItemMusicTop.vue'
import ItemMusicList from '@/components/item/ItemMusicList.vue'
import {getMusicDetail, getMusicListSongs} from '@/request/api/item.js'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
export default {
    setup() {
        const state = reactive({
            playlist: {}, //歌单的详情页的数据
            itemList: [], //歌单详情页所有歌曲的数据
        })
        onMounted(async () => {
            let id = useRoute().query.id
            // console.log(id)
            // 获取歌单详情页面
            let res = await getMusicDetail(id)
            // console.log(res)
            state.playlist = res.data.playlist
            // console.log(state.playlist);
            // 获取详情页面歌单的所有歌曲
            let result = await getMusicListSongs(id)
            // console.log(result)
            state.itemList = result.data.songs
            // 防止页面刷新，数据丢失，将数据保存到sesssionStorage中
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })
        return {state}
    },
    components: {
        ItemMusicTop,
        ItemMusicList
    }
}
</script>
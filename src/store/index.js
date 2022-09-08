import { createStore } from 'vuex'
import { getMusicLyric } from '@/request/api/item'
import { getPhoneLogin } from '@/request/api/home.js'
export default createStore({
  state: {
    playList: [{ //播放列表
      al: {
        id: 123723319,
        name: "再见莫妮卡",
        picUrl: "https://p2.music.126.net/me6QV0CallEOlOP6Zb0b3w==/109951165770805050.jpg",
        tns: [],
        pic_str: "109951165770805050",
        pic: 109951165770805060
      },
      id: 1824045033,
      name: "再见莫妮卡",
      ar: [{ name: "彭席彦" }, { name: "Franky弗兰奇" }]
    }],
    playListIndex: 0, //默认下标为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, // 歌曲详情页的显示
    lyricList: {}, //歌词
    currentTime: 0, //歌词播放的当前时间
    duration: 0, // 歌曲的总时长
    isFooterMusic: true, //底部组件是否显示，默认显示
    isLogin: false, // 判断用户是否登录，未登录则跳转到登录页面
    token: "", //用户登录的token信息
    user: {},//用户信息
  },
  getters: {
  },
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    updatePlayList: function (state, value) {
      state.playList = value
      // console.log(state.playList)
    },
    updatePlayListIndex: function (state, value) {
      console.log(value)
      state.playListIndex = value
    },
    updateDetailShow: function (state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList: function (state, value) {
      // console.log(value)
      state.lyricList = value
    },
    updateCurrentTime: function (state, value) {
      // console.log(value)
      state.currentTime = value
    },
    updateDuration: function (state, value) {
      // console.log(value)
      state.duration = value
    },
    pushPlayList: function (state, value) {
      state.playList.push(value)
    },
    updateIsLogin: function (state, value) {
      state.isLogin = true
    },
    updateToken: function (state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    },
    updateUser: function (state, value) {
      state.user = value
    }
  },
  // 异步请求
  actions: {
    // 获取歌词请求
    getLyric: async function (context, value) {
      // console.log(context)
      // console.log(value)
      let res = await getMusicLyric(value)
      // console.log(res)
      // axios 里面的一个提交用法
      context.commit("updateLyricList", res.data.lrc)
    },
    getLogin: async function (context, value) {
      let res = await getPhoneLogin(value);
      // console.log(res);
      return res
    }
  },
  modules: {
  }
})

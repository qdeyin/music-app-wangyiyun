import service from "..";
// 获取轮播图图片数据
export function getBanner(){
    return service({
        method: 'get',
        url: '/banner?type=2'
    })
}
// 获取好歌单数据
export function getMusicList(){
    return service({
        method: 'get',
        url: '/personalized?limit=10'
    })
}
// 搜索关键词 调用例子 : /search?keywords= 海阔天空
export function getSearchMusic(data){
    return service({
        method: 'get',
        url: `/search?keywords=${data}`
    })
}
//登录
export function getPhoneLogin(data){
    return service({
        method:"GET",
        url:`/login?email=${data.email}&password=${data.password}`
    })
}

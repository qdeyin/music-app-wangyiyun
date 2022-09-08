import service from "..";
// 获取歌单详情数据
export function getMusicDetail(data){
    return service({
        method: 'get',
        url: `/playlist/detail?id=${data}`
    })
}
// 获取歌单所有歌曲
export function getMusicListSongs(data){
    return service({
        method: 'get',
        url: `/playlist/track/all?id=${data}&limit=20&offset=0`
    })
}
// 获取歌词 /lyric?id=33894312
export function getMusicLyric(data){
    return service({
        method: 'GET',
        url: `/lyric?id=${data}`
    })
}


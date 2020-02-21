import request from '../utils/request'

/**
 * 获取game列表
 */
export function queryGameList(params) {
    return request({
        url: `api/v1/game/queryList`,
        method: 'get',
        params
    })
}

/**
 * 获取game列表，辨识是否已收藏
 */
export function queryListToCollection(params) {
    return request({
        url: `api/v1/game/queryListToCollection`,
        method: 'get',
        params
    })
}
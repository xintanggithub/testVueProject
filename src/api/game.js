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
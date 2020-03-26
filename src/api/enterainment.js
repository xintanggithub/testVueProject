import request from '../utils/request'

/**
 * 查询列表
 */
export function queryMhList(params) {
    return request({
        url: `api/v1/forward/queryMhList`,
        method: 'get',
        params
    })
}

/**
 * 搜索
 */
export function searchMhList(params) {
    return request({
        url: `api/v1/forward/search`,
        method: 'get',
        params
    })
}
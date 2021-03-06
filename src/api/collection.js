import request from '../utils/request'

/**
 * 新增收藏
 * @param params
 */
export function insertCollection(params) {
    return request({
        url: `api/v1/collection/insertCollection`,
        method: 'post',
        data: params
    })
}

/**
 * 取消收藏
 */
export function deleteCollection(params) {
    return request({
        url: `api/v1/collection/deleteCollection`,
        method: 'get',
        params
    })
}

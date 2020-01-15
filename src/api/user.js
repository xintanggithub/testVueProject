import request from '../utils/request'

/**
 * 获取头像列表
 */
export function getHeaderList(params) {
    return request({
        url: `api/v1/user/queryHead`,
        method: 'get',
        params
    })
}

/**
 * 更新头像
 */
export function changeHead(params) {
    return request({
        url: `api/v1/user/updateUser`,
        method: 'post',
        data: params
    })
}
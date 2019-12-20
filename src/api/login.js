import request from '../utils/request'

/**
 * 登录
 * @param params 参数
 */
export function login(params) {
    return request({
        url: `api/v1/login/login`,
        method: 'post',
        data: params
    })
}

/**
 * 获取用户信息
 * @param params 参数
 */
export function queryUserInfo(params) {
    return request({
        url: `api/v1/user/queryUserById`,
        method: 'get',
        data: params
    })
}
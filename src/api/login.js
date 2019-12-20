import request from '../utils/request'

/**
 * 登录
 * @param params 参数
 */
export function login(params) {
    return request({
        url: `api/v1/login/login`,
        method: 'post',
        params
    })
}
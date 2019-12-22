import request from '../utils/request'

/**
 * 登录
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
 */
export function queryUserInfo(params) {
    return request({
        url: `api/v1/user/queryUserById`,
        method: 'get',
        params
    })
}

/**
 * 校验是否已注册
 */
export function checkRegister(params) {
    return request({
        url: `api/v1/login/checkRegister`,
        method: 'get',
        params
    })
}

/**
 * 发送验证码
 */
export function sendVerificationCode(params) {
    return request({
        url: `api/v1/login/sendVerificationCode`,
        method: 'get',
        params
    })
}

/**
 * 注册
 */
export function register(params) {
    return request({
        url: `api/v1/login/register`,
        method: 'post',
        data: params
    })
}

/**
 * 校验验证码是否正确
 */
export function checkVerificationCode(params) {
    return request({
        url: `api/v1/login/checkVerificationCode`,
        method: 'get',
        params
    })
}

/**
 * 修改密码
 */
export function updatePassword(params) {
    return request({
        url: `api/v1/login/updateLogin`,
        method: 'post',
        data: params
    })
}
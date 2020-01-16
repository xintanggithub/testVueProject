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

/**
 * 更新用户信息
 */
export function changeUserInfo(params) {
    return request({
        url: `api/v1/user/updateUser`,
        method: 'post',
        data: params
    })
}

/**
 * 修改用户名相关
 * @param userId 用户ID
 * @param userName 用户名
 * @param sex 性别 0 女 1男
 */
export function getNameParams(userId, userName, sex) {
    const params = {};
    params["userId"] = userId;
    params["userName"] = userName;
    if (sex) {
        params["sex"] = sex;
    }
    return params
}

/**
 * 修改账号信息
 * @param userId 用户ID
 * @param tel 电话
 */
export function getAccountParams(userId, tel) {
    const params = {};
    params["userId"] = userId;
    params["tel"] = tel;
    return params
}

/**
 * 修改地址
 * @param userId 用户ID
 * @param province 省
 * @param city 市
 * @param area 区
 * @param address 详细地址
 */
export function getAddressParams(userId, province, city, area, address) {
    const params = {};
    params["userId"] = userId;
    if (province !== null && province !== "" && province !== undefined) {
        params["province"] = province;
        params["city"] = city;
        params["area"] = area;
    }
    if (address !== null && address !== "" && address !== undefined) {
        params["address"] = address;
    }
    return params
}

/**
 * 修改简介
 * @param userId 用户ID
 * @param description 简介
 */
export function getDescriptionParams(userId, description) {
    const params = {};
    params["userId"] = userId;
    params["description"] = description;
    return params
}
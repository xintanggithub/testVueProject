let LOGIN_STATUS_KEY = 'login_status_key';
let USER_NAME_KEY = 'user_name_key';
let USER_COED_KEY = 'user_code_key';
let USER_ID_KEY = 'user_id_key';
let USER_IMG_KEY = 'user_img_key';
let ONLINE_VALUE = '_online';
let OFFLINE_VALUE = "_offline";
let BY_ACCESS_TOKEN_KEY = "by_access_token_key";

let LOGIN_LIST_CACHE_LIST_KEY = "login_list_cache_list_key";

/**
 * 登录
 */
export function loginIn(userId, userName, img, userCode) {
    window.localStorage.setItem(LOGIN_STATUS_KEY, ONLINE_VALUE);
    window.localStorage.setItem(USER_ID_KEY, userId);
    window.localStorage.setItem(USER_NAME_KEY, userName);
    window.localStorage.setItem(USER_IMG_KEY, img);
    window.localStorage.setItem(USER_COED_KEY, userCode);
    console.log("更新登录状态为在线")
}

export function setToken(token) {
    window.localStorage.setItem(BY_ACCESS_TOKEN_KEY, token);
}

/**
 * 获取token
 * @returns string
 */
export function getAccessToken() {
    return window.localStorage.getItem(BY_ACCESS_TOKEN_KEY);
}

/**
 * 设置用户名
 * @param userName 用户名
 */
export function setUserName(userName) {
    window.localStorage.setItem(USER_NAME_KEY, userName);
}

/**
 * 退出
 */
export function loginOut() {
    console.log("更新登录状态为离线1");
    window.localStorage.setItem(LOGIN_STATUS_KEY, OFFLINE_VALUE);
    window.localStorage.setItem(USER_ID_KEY, '');
    window.localStorage.setItem(USER_NAME_KEY, '');
    window.localStorage.setItem(USER_IMG_KEY, '');
    console.log("更新登录状态为离线")
}

/**
 * 修改头像
 * @param img
 */
export function changeImg(img) {
    window.localStorage.setItem(USER_IMG_KEY, img);
}

/**
 * 获取登录信息
 */
export function getLoginInfo() {
    const response = {};
    response['name'] = window.localStorage.getItem(USER_NAME_KEY);
    response['id'] = window.localStorage.getItem(USER_ID_KEY);
    response['img'] = window.localStorage.getItem(USER_IMG_KEY);
    response['userCode'] = window.localStorage.getItem(USER_COED_KEY);
    return response
}

/**
 * 登录状态
 */
export function loginStatus() {
    let status = window.localStorage.getItem(LOGIN_STATUS_KEY);
    if (null === status || status === "") {
        return false;
    } else {
        return status === ONLINE_VALUE;
    }
}

/**
 * 登录列表
 */
export function getLoginListCache() {
    let list = JSON.parse(window.localStorage.getItem(LOGIN_LIST_CACHE_LIST_KEY));
    if (list === '' || list === null || list === undefined || list === 'undefined') {
        list = [];
    }
    return list
}

/**
 * 添加登录记录
 */
export function addLoginList(userCode, password) {
    let cache = getLoginListCache();
    if (cache.length === 0 || cache === []) {
        cache = [];
        const p = {};
        p['userCode'] = userCode;
        p['password'] = password;
        cache.push(p);
        window.localStorage.setItem(LOGIN_LIST_CACHE_LIST_KEY, JSON.stringify(cache))
    } else {
        let isCache = false;
        let index = -1;
        let i;
        for (i = 0; i < cache.length; i++) {
            if (cache[i].userCode === userCode) {
                isCache = true;
                index = i;
                break;
            }
        }
        const p = {};
        p['userCode'] = userCode;
        p['password'] = password;
        if (isCache) {
            cache[index] = p;
        } else {
            cache.push(p);
        }
        window.localStorage.setItem(LOGIN_LIST_CACHE_LIST_KEY, JSON.stringify(cache))
    }
}

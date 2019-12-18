let LOGIN_STATUS_KEY = 'login_status_key';
let USER_NAME_KEY = 'user_name_key';
let USER_ID_KEY = 'user_id_key';
let USER_IMG_KEY = 'user_img_key';
let ONLINE_VALUE = '_online';
let OFFLINE_VALUE = "_offline";

export function loginIn(userId, userName, img) {
    window.localStorage.setItem(LOGIN_STATUS_KEY, ONLINE_VALUE);
    window.localStorage.setItem(USER_ID_KEY, userId);
    window.localStorage.setItem(USER_NAME_KEY, userName);
    window.localStorage.setItem(USER_IMG_KEY, img);
    console.log("更新登录状态为在线")
}

export function loginOut() {
    console.log("更新登录状态为离线1");
    window.localStorage.setItem(LOGIN_STATUS_KEY, OFFLINE_VALUE);
    window.localStorage.setItem(USER_ID_KEY, '');
    window.localStorage.setItem(USER_NAME_KEY, '');
    window.localStorage.setItem(USER_IMG_KEY, '');
    console.log("更新登录状态为离线")
}

export function getLoginInfo() {
    const response = {};
    response['name'] = window.localStorage.getItem(USER_NAME_KEY);
    response['id'] = window.localStorage.getItem(USER_ID_KEY);
    response['img'] = window.localStorage.getItem(USER_IMG_KEY);
    return response
}

export function loginStatus() {
    let status = window.localStorage.getItem(LOGIN_STATUS_KEY);
    if (null === status || status === "") {
        return false;
    } else {
        return status === ONLINE_VALUE;
    }
}

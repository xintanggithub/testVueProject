import request from '../utils/request'
import request2 from '../utils/request2'

export function queryBookByUserParams(keyword, openType, page, pageSize) {
    const params = {};
    if (keyword !== "" && keyword !== null && keyword !== undefined) {
        params['keyword'] = keyword;
    }
    params['openType'] = openType;
    params['page'] = page;
    params['pageSize'] = pageSize;
    return params
}

/**
 * 获取列表
 * @param params
 */
export function queryBookByUser(params) {
    return request({
        url: `api/v1/book/queryBookAllByUser`,
        method: 'get',
        params
    })
}

export function queryBookByUser2(params) {
    return request2({
        url: `api/v1/book/queryBookAllByUser`,
        method: 'get',
        params
    })
}

export function queryBookBySplashParams(keyword, page, pageSize) {
    const params = {};
    if (keyword !== "" && keyword !== null && keyword !== undefined) {
        params['keyword'] = keyword;
    }
    params['splash'] = 1;
    params['page'] = page;
    params['pageSize'] = pageSize;
    return params
}

export function queryBookBySplash(params) {
    return request({
        url: `api/v1/book/queryBooksBySplash`,
        method: 'get',
        params
    })
}

export function queryBookBySplash2(params) {
    return request2({
        url: `api/v1/book/queryBooksBySplash`,
        method: 'get',
        params
    })
}

export function insertBookParams(userId, title, openType, img, description, content, bookType) {
    const params = {};
    params['userId'] = userId;
    params['title'] = title;
    params['openType'] = openType;
    params['img'] = img;
    params['description'] = description;
    params['content'] = content;
    params['bookType'] = bookType;
    return params
}

export function insertBook(params) {
    return request({
        url: `api/v1/book/insertBook`,
        method: 'post',
        data: params
    })
}

//
// export function login(params) {
//     return request({
//         url: `api/v1/login/login`,
//         method: 'post',
//         data: params
//     })
// }
//
// export function queryUserInfo(params) {
//     return request({
//         url: `api/v1/user/queryUserById`,
//         method: 'get',
//         params
//     })
// }
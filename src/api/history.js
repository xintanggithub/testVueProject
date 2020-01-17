import request2 from '../utils/request2'

export function getHistoryParamsByUser(userId, page, pageSize) {
    const params = {};
    params['userId'] = userId;
    params['page'] = page;
    params['pageSize'] = pageSize;
    return params;
}

/**
 * 获取历史记录
 */
export function queryHistoryList(params) {
    return request2({
        url: `api/v1/history/queryHistoryByUser`,
        method: 'get',
        params
    })
}


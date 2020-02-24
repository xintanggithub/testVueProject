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

/**
 * 新增的入参
 * @param userId
 * @param type
 * @param businessName
 * @param businessId
 */
export function getInsertHistoryParams(userId, type, businessName, businessId) {
    const params = {};
    params["userId"] = userId;
    params["type"] = type;
    params["businessName"] = businessName;
    params["businessId"] = businessId;
    return params;
}

/**
 * 新增历史记录
 * @param params
 */
export function insertHistory(params) {
    return request2({
        url: `api/v1/history/insertHistory`,
        method: 'post',
        data: params
    })
}



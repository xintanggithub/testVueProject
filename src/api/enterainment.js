import request from '../utils/request'

export function queryMhList(params) {
    return request({
        url: `api/v1/forward/queryMhList`,
        method: 'get',
        params
    })
}
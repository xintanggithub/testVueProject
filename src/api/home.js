import request from '../utils/request'

/**
 * 获取配置列表
 */
export function queryConfig(params) {
    return request({
        url: `api/v1/config/queryMainConfig`,
        method: 'get',
        params
    })
}
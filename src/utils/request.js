import axios from 'axios'
import {Message} from 'element-ui'
import {getAccessToken} from './loginStatus'
import {getUrl} from './baseUrl'

// const baseUrl = 'https://tsondy.club/';
const baseUrl = getUrl();

const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000
});

service.interceptors.request.use(config => {
    //可以处理配置信息（请求头、参数加密等）
    if (config.method === 'post') {
        console.log("config.method ", 'post');
        config.headers['Content-Type'] = 'application/json';
    } else {
        console.log("config.method ", 'get');
    }

    let accessToken = getAccessToken();
    console.log("accessToken ===> ", accessToken);
    config.headers['AccessToken'] = accessToken;

    return config
}, error => {
    console.log("request error", error);
    Promise.reject(error)
});

service.interceptors.response.use(response => {
        const res = response.data;
        if (res.resultCode !== 200) {
            console.log("response --->", res);
            let message = getErrorMessage(res.resultCode, res.resultMessage);
            Message({
                showClose: true,
                message: message,
                type: 'error'
            });
            return Promise.reject(Error(message))
        } else {
            console.log("response success--->", res);
            return response
        }
    },
    error => {
        console.log("response error", error);
        return Promise.reject(error)
    });

export default service

function getErrorMessage(code, resultMessage) {
    let message = resultMessage;
    switch (code) {
        case 7777:
            message = '用户不存在';
            break;
        case 7778:
            message = '用户已存在';
            break;
        case 7779:
            message = '密码错误';
            break;
        case 7781:
            message = '新密码不能和旧密码相同';
            break;
        case 3307:
            message = '验证码错误';
            break;
        case 1001:
            message = '暂无数据';
            break;
    }
    return message;
}
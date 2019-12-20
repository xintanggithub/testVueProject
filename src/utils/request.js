import axios from 'axios'

const baseUrl = 'https://tsondy.club/';

const service = axios.create({
    baseURL: baseUrl,
    timeout: 5000
});

service.interceptors.request.use(config => {
    //可以处理配置信息（请求头、参数加密等）
    return config
}, error => {
    console.log("request error", error);
    Promise.reject(error)
});

service.interceptors.response.use(response => {
        const res = response.data;
        if (res.resultCode !== 200) {
            this.$notify({
                title: 'error',
                type: 'error',
                message: res.resultMessage || res.msg,
                duration: 2000
            })
        } else {
            return response
        }
    },
    error => {
        console.log("response error", error);
        return Promise.reject(error)
    });

export default service
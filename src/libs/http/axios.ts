import axios, { AxiosRequestConfig } from 'axios'
import QS from 'qs'
import router from '@/router/index'
import { errorCode } from '../enum/request'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers.common['Remote-Host'] =
    import.meta.env.VITE_APP_BASE_DOMAIN || window.location.hostname

axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API
// 请求超时
axios.defaults.timeout = 100000

// 请求拦截器
axios.interceptors.request.use(
    function (config: AxiosRequestConfig) {
        if (config.headers) {
            const userStore = useUserStore()
            config.headers.Authorization = userStore.getToken
        }
        return config
    },
    (error) => {
        return Promise.reject(error.data.error.message)
    }
)

//响应拦截器
axios.interceptors.response.use(
    (response) => {
        if (!response) return
        if (!response.headers) return response
        const status = response.status
        const resData: WebResponse = response.data
        if (status === 200) {
            if (errorCode.includes(resData.code)) {
                alert(resData?.message)
                return Promise.reject()
            } else {
                return resData
            }
        }
    },
    function (error) {
        const status = error?.response?.status
        if (status === 401) {
            alert('登录失效，请重新登录')
            router.push({ path: '/login' })
        } else {
            alert(error.response.data.message || '服务器错误')
        }
        return Promise.reject()
    }
)

// get方法
export const get: requestType = (url, params) => {
    return new Promise((resolve) => {
        axios
            .get(url, {
                params: params,
                paramsSerializer: (params) => {
                    return QS.stringify(params, { indices: false })
                },
            })
            .then((res: any) => {
                resolve(res)
            })
    })
}

// post方法
export const post: requestType = (url, data, config) => {
    return new Promise((resolve) => {
        axios.post(url, data, config).then((res: any) => {
            resolve(res)
        })
    })
}

// post方法，参数序列化
export const qspost: requestType = (url, params, config) => {
    return new Promise((resolve) => {
        axios.post(url, QS.stringify(params), config).then((res: any) => {
            resolve(res)
        })
    })
}
// put方法
export const put: requestType = (url, data, config) => {
    return new Promise((resolve) => {
        axios.put(url, data, config).then((res: any) => {
            resolve(res)
        })
    })
}

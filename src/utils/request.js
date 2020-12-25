import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'
import { getTimeStamp } from '@/utils/auth'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

// request interceptor
service.interceptors.request.use(config => {
  if (store.getters.token) {
    if (IsCheckTimeOut()) {
      // Message.error(config.data.message)
      // Message.error('token超时了')
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('验证过期'))
    } else {
      config.headers.Authorization = `Bearer ${store.getters.token}`
    }
  }
  return config
})

// response interceptor
service.interceptors.response.use((res) => {
  console.log(res.data, '响应拦截')
  const { success, message, data } = res.data
  if (success) {
    return data
  } else {
    Message.error(message)
    return Promise.reject(new Error(message))
    // 这是把错误数据返回给函数，让catch捕捉
  }
}, err => {
  if (err.response && err.response.data && err.response.data.code === 10002) {
    store.dispatch('user/logout')
    router.push('/login')
  }
  // console.dir(err)
  Message.error(err.message)
  // Message.error(err.response.data.message)
  return Promise.reject(new Error('响应报错'))
}
)

function IsCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 >= Infinity
}

export default service

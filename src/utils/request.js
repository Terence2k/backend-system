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
      Message.error('token超时了')
      store.dispatch('user/logout')
      router.push('/login')
      return Promise.reject(new Error('token 超时'))
    } else {
      config.headers.Authorization = `Bearer ${store.getters.token}`
      return config
    }
  }
  return config
}, err => {
  return Promise.reject(err)
}

)

// response interceptor
service.interceptors.response.use(
  (res) => {
    console.log(res.data, '拦截')
    const { success, message, data } = res.data
    if (success) {
      // Message.success(message)
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
      // 这是把错误数据返回给函数，让catch捕捉
    }
  }, err => {
    console.dir(err)
    Message.error(err.response.data.message)
  }
)

function IsCheckTimeOut() {
  var currentTime = Date.now()
  var timeStamp = getTimeStamp()
  return (currentTime - timeStamp) / 1000 >= 2
}

export default service

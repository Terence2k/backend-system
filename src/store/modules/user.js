import { login, getInfo, getUserInfoId } from '@/api/user'
import { setToken, getToken, removeToken, setTimeStamp, removeTimeStamp } from '@/utils/auth'

export default {
  namespaced: true,

  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
      setToken(payload)
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    removeToken(state) {
      console.log('clear token')
      state.token = ''
      removeToken()
      removeTimeStamp()
    },
    removeUserInfo(state) {
      console.log('clear info')
      state.userInfo = ''
    }
  },
  actions: {
    async login(context, payload) {
      const res = await login(payload)

      context.commit('setToken', res)
      setTimeStamp()
    },
    async getUserInfo(context) {
      const res = await getInfo()
      console.log(res.userId)
      const resId = await getUserInfoId(res.userId)
      const userInfo = { ...res, ...resId }
      console.log(userInfo, 'res')
      context.commit('setUserInfo', userInfo)
    },
    logout({ commit }) {
      console.log('执行清除token，info')
      commit('removeToken')
      commit('removeUserInfo')
    }

  }
}

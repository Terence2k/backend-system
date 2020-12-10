import { login, getInfo, getUserInfoId } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'

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
    }
  },
  actions: {
    async login(context, payload) {
      const res = await login(payload)

      console.log(res, 'actions')
      context.commit('setToken', res)
    },
    async getUserInfo(context) {
      const res = await getInfo()
      console.log(res.userId)
      const resId = await getUserInfoId(res.userId)
      const userInfo = { ...res, ...resId }
      console.log(userInfo, 'res')
      context.commit('setUserInfo', userInfo)
    }

  }
}

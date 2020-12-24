import { login, getInfo, getUserInfoId } from '@/api/user'
import { resetRouter } from '@/router'
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
      state.token = ''
      removeToken()
      removeTimeStamp()
    },
    removeUserInfo(state) {
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

      context.commit('setUserInfo', userInfo)
      return userInfo
    },
    logout({ commit }) {
      commit('removeToken')
      commit('removeUserInfo')
      resetRouter()
      commit('permission/setRoutes', [], { root: true })
    }

  }
}

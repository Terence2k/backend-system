import { login } from '@/api/user'
import { setToken, getToken } from '@/utils/auth'

export default {
  namespaced: true,

  state: {
    token: getToken()
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
      setToken(payload)
    }
  },
  actions: {
    async login(context, payload) {
      const res = await login(payload)
      if (res.data.success) {
        context.commit('setToken', res.data.data)
        console.log(res.data.data, 'toekn')
      }
    }
  }
}

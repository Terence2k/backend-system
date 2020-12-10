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

      console.log(res, 'actions')
      context.commit('setToken', res)
    }
  }
}

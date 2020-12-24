import store from '@/store'

export const valiPermission = {
  methods: {
    checkPermission(data) {
      return store.state.user.userInfo.roles.points.includes(data)
    }
  }
}

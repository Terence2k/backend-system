
import { constantRoutes, asyncRoutes } from '@/router'
const state = {
  routes: []
}

const mutations = {
  setRoutes(state, data) {
    state.routes = [...constantRoutes, ...data]
  }
}
const actions = {
  filterRouter(context, roles) {
    const myRouter = asyncRoutes.filter(item => roles.menus.indexOf(item.name) > -1)
    // 404 page must be placed at the end !!!

    myRouter.push({ path: '*', redirect: '/404', hidden: true })

    context.commit('setRoutes', myRouter)
    return myRouter
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import * as directives from '@/directives'
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})
// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

import Components from '@/components'
Vue.use(Components)

import Print from 'vue-print-nb'
Vue.use(Print)

import { valiPermission } from '@/mixin'
Vue.mixin(valiPermission)

import * as filters from '@/filters'
for (const key in filters) {
  const filterName = key
  const filterFunction = filters[key]
  Vue.filter(filterName, filterFunction)
}

import i18n from '@/i18n'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

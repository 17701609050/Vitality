// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import Routers from './router'
import iView from 'iview'
import store from './vuex'
import {sync} from 'vuex-router-sync'
import 'iview/dist/styles/iview.css'
import './assets/style/admin.css'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(iView)
Vue.use(mavonEditor)

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
}

const router = new VueRouter(RouterConfig)
sync(store, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})

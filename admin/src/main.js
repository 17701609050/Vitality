// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import Routers from './router'
import Util from './libs/util'
import iView from 'iview'
import VueLocalStorage from 'vue-ls'
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

Vue.use(VueLocalStorage, {
  namespace: 'Vitatity-'
});

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


router.beforeEach(async (to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title)
  
  if (!!to.meta.noAuth) {
    // 不需要认证的页面直接跳过
    next()
  }else{
    const token = Vue.ls.get("token");
    if (token) {
      store.dispatch('admin/auth').then(x => {
        if(x.data.status==0){
          Vue.prototype.$Message.error(x.data.error || '未授权')
        }else if(x.data){
          next()
        }
  
      }).catch(err => {
        console.log(err)
        Vue.prototype.$Message.error(err.data.error || '未授权')
        setTimeout(() => {
          next('/login')
        }, 1500);
      })
  
    }else {
        Vue.prototype.$Message.error('未授权')
        setTimeout(() => {
          next('/login')
        }, 1500)
      
    }
  }
  
})
router.afterEach(() => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});

sync(store, router)

new Vue({
  el: '#app',
  router: router,
  store: store,
  components: { App },
  template: '<App/>'
})

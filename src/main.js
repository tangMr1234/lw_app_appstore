import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from '@/router/index'
import {ConfirmPlugin} from 'vux'
import utils from '@/utils/utils'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(ConfirmPlugin)
FastClick.attach(document.body)

const store = new Vuex.Store({}) // 这里你可能已经有其他 module

store.registerModule('vux', { // 名字自己定义
  state: {
    isLoading: false,
    direction: 'forward'
  },
  mutations: {
    updateLoadingStatus(state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection(state, payload) {
      state.direction = payload.direction
    }
  }
})

Vue.config.productionTip = false

//注册全局方法，用来获取url传递的参数
Vue.prototype.$utils = utils
//关闭loading的全局方法
Vue.prototype.loadingRemove = function () {
  store.commit('updateLoadingStatus', {isLoading: false})
}
//注册弹窗的全局方法
Vue.prototype.confirm = function (title, content, buttonText, func) {
  this.$vux.confirm.show({
    title: title,
    content: content,
    confirmText: buttonText,
    onConfirm() {
      if (func && func != "") {
        func();
      }
    }
  })
}

// router.beforeEach(function (to, from, next) {
// if(to.path!="/login"){
// store.commit('updateLoadingStatus', {isLoading: true})
// }
// next()
// })
// simple history management

const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      // 判断是否是ios左滑返回
      if (!isPush && (Date.now() - endTime) < 377) {
        store.commit('updateDirection', {direction: ''})
      } else {
        store.commit('updateDirection', {direction: 'reverse'})
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  isPush = false;
})

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')

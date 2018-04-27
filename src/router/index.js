import Vue from 'vue'
import Router from 'vue-router'

const Login = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Layout/Login'))
  })
} // 登录
const Home = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Home'))
  })
} // 主页面框架
const MainFrame = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/MainFrame'))
  })
} // Frame框架

const Recommend = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Recommend/Recommend'))
  })
} // 首页-推荐1
const App = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/App/App'))
  })
} // App页面
const Chart = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Chart/Chart'))
  })
} // Chart报表页面
const Install = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Install/Install'))
  })
} // 已安装应用
const Details = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Details/Details'))
  })
} // 应用详情
const ERater = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Rater/ERater'))
  })
} // 我要评价
const AllRater = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Rater/AllRater'))
  })
} // 所有评价

const NotFound = resolve => {
  require.ensure([], () => {
    resolve(require('@/views/Layout/404'))
  })
} // 错误404

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      name: '错误界面',
      hidden: true
    },
    {
      path: '*',
      name: '404',
      hidden: true,// 隐藏，在菜单中不显示
      redirect: {path: '/404'}
    },
    {
      path: '/',
      name: '主页面',
      component: Home,
      redirect: {path: '/index'},
      children: [
        {path: '/index', component: Recommend, name: '推荐', icon: 'icon-tuijian', meta:{name: "应用中心-推荐"}},
        {path: '/app', component: App, name: 'APP', icon: 'icon-yingyong', meta:{name: "应用中心-APP类"}},
        {path: '/chart', component: Chart, name: '报表', icon: 'icon-baobiaoguanli', meta:{name: "应用中心-报表类"}},
        {path: '/install', component: Install, name: '已购', icon: 'icon-anzhuangbao', meta:{name: "应用中心-已购"}},
        //应用详情页
        {path: '/detail', component: Details, name: '应用详情', hidden: true,meta:{name:"应用详情"}},
        //我要评价
        {path: '/erater', component: ERater, name: '我要评价', hidden: true,meta:{name:"我要评价",tabbar: false} },
        //所有评价
        {path: '/allrater', component: AllRater, name: '所有评价', hidden: true,meta:{name:"所有评价",tabbar: false} },
      ]
    },

    //Frame框架页
    {
      path: '/mainframe', component: MainFrame, name: 'Frame框架页', hidden: true
    }
  ]
})

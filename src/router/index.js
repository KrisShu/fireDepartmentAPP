import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      auth:true//设置当前路由需要校验
    },
    redirect:'/unit',
    children:[
      {
        path:'unit',
        name:'unit',
        meta: {
          active: 0,
        },
        component: () => import("../views/unit/index.vue")
      },
      {
        path:'terminal',
        name:'terminal',
        meta: {
          active: 1,
        },
        component: () => import("../views/terminal/index.vue")
      }, 
      {
        path:'set',
        name:'set',
        meta: {
          active: 2,
        },
        component: () => import("../views/set/index.vue")
      }
    ]
  },
  {
    path:'/report',
    name:'report',
    component: () => import("../views/unit/report.vue")
  },
  {
    path:'/firenetworkDetials',
    name:'firenetworkDetials',
    component: () => import("../views/terminal/firenetworkDetials.vue")
  },
  {
    path:'/updatePassword',
    name:'updatePassword',
    component: () => import("../views/set/updatePassword.vue")
  },
  {
    path:'/updateSystem',
    name:'updateSystem',
    component: () => import("../views/set/updateSystem.vue")
  },
  {
    path:'/login',
    name: 'login',
    component: () => import("../views/login.vue")
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

//路由守卫
router.beforeEach(function(to,from,next){
  if(to.matched.some( m => m.meta.auth)){  // 对路由进行验证       
    if(localStorage.getItem('changeLogin')==1) { // 已经登陆      
      next()   // 正常跳转到你设置好的页面     
    }
    else{       
      // 未登录则跳转到登陆界面
      next({path:'/login'})
    } 
  }else{ 
    next() 
  } 
})

export default router

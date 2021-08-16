import Vue from 'vue'
import Router from 'vue-router'
import personal from "./personal";

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject){
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch(err => err)
}

const router=new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'index',
      component:()=>import('../components/index.vue'),
      redirect: 'home',
      children:[
        {
          path: '/home',
          name: 'home',
          component: () => import('../components/Home'),
          meta: { 
            title:'首页',
          }
        },{
          path: '/about',
          name: 'about',
          component: () => import('../components/About'),
          meta: { 
            title:'关于艾康',
          }
        },{
          path: '/prod',
          name: 'prod',
          component: () => import('../components/Prod/index'),
          meta: { 
            title:'产品中心',
          }
        },{
          path: '/prod_detail',
          name: 'prod_detail',
          component: () => import('../components/Prod/detail'),
          meta: { 
            title:'产品详情',
          }
        },{
          path: '/prod_goods',
          name: 'prod_goods',
          component: () => import('../components/Prod/goods'),
          meta: { 
            title:'购物车',
            isLogin:true
          }
        },{
          path: '/prod_settle',
          name: 'prod_settle',
          component: () => import('../components/Prod/settle'),
          meta: { 
            title:'结算',
            isLogin:true
          }
        },{
          path: '/prod_settle_pay',
          name: 'prod_settle_pay',
          component: () => import('../components/Prod/settle_pay'),
          meta: { 
            title:'支付',
            isLogin:true
          }
        },{
          path: '/news',
          name: 'news',
          component: () => import('../components/News'),
          meta: { 
            title:'新闻资讯',
          }
        },{
          path: '/news_detail',
          name: 'news_detail',
          component: () => import('../components/New_detail'),
          meta: { 
            title:'资讯详情',
          }
        },{
          path: '/join',
          name: 'join',
          component: () => import('../components/Join'),
          meta: { 
            title:'加入我们',
          }
        },{
          path: '/contact',
          name: 'contact',
          component: () => import('../components/Contact'),
          meta: { 
            title:'联系我们',
          }
        },{
          path: '/world',
          name: 'world',
          component: () => import('../components/Prod/world'),
          meta: { 
            title:'123',
          }
        },
        ...personal
      ]
    },{
      path: '/login',
      name: 'login',
      component:()=>import('../components/login/Login'),
      meta: { 
        title:'登录',
      }
    },{
      path: '/forgin',
      name: 'forgin',
      component:()=>import('../components/login/forgin'),
      meta: { 
        title:'忘记密码',
      }
    },{
      path: '/register',
      name: 'register',
      component:()=>import('../components/login/Register'),
      meta: { 
        title:'注册',
      }
    },{
      path: '/txt',
      name: 'txt',
      component:()=>import('../components/login/txt'),
      meta: { 
        title:'用户协议',
      }
    },{
      path: '/wx_shipper',
      name: 'wx_shipper',
      component:()=>import('../components/wx/shipper'),
      meta: { 
        title:'微信',
      }
    },{
      path: '/wx_requery',
      name: 'wx_requery',
      component:()=>import('../components/wx/requery'),
      meta: { 
        title:'微信',
      }
    }
  ]
})

router.beforeEach((to,from,next)=>{ 
  if(to.meta.isLogin){
    let token = localStorage.getItem('token');
    if(!token){
      next({path:'/login'})
    }else{
      next()
    }
  }else{
    next()
  }
})
export default router;

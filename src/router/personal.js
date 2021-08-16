export default [
    {
        path: '/personal',
        name: 'personal',
        component: () => import('../components/personal/index'),
        redirect: 'personal_order',
        children: [
          {
            path: '/personal_order',
            name: 'personal_order',
            component: () => import('../components/personal/order'),
            meta:{
                title:'我的订单',
                isLogin:true
            },
          },{
            path: '/personal_order_detail',
            name: 'personal_order_detail',
            component: () => import('../components/personal/order_detail'),
            meta:{
                title:'订单详情',
                isLogin:true
            },
          },{
            path: '/personal_requery',
            name: 'personal_requery',
            component: () => import('../components/personal/requery'),
            meta:{
                title:'我的询单',
                isLogin:true
            },
          },{
            path: '/personal_download',
            name: 'personal_download',
            component: () => import('../components/personal/download'),
            meta:{
                title:'文件下载',
                isLogin:true
            },
          },{
            path: '/personal_collect',
            name: 'personal_collect',
            component: () => import('../components/personal/collect'),
            meta:{
                title:'我的收藏',
                isLogin:true
            },
          },{
            path: '/personal_info',
            name: 'personal_info',
            component: () => import('../components/personal/baseData'),
            meta:{
                title:'基本资料',
                isLogin:true
            },
          },{
            path: '/personal_password',
            name: 'personal_password',
            component: () => import('../components/personal/password'),
            meta:{
                title:'密码管理',
                isLogin:true
            },
          },
        ]
    },
]

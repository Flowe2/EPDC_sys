import { createRouter, createWebHistory } from 'vue-router'


import User from '../views/User.vue';
import Admin from '../views/Admin.vue';

const routes = [
  {
    path: '/user',
    name: 'User',
    component: User,
    children: [
      {
        path: '/',
        redirect: '/user/QuBank'
      },
      {
        path: '/user/quBank',
        name: 'QuBank',
        component: () => import('../components/QuBank.vue'),
        meta: {
          // token验证
          ifPass: true
        }
      },
      {
        path: '/user/login',
        name: 'UserLogin',
        component: () => import('../components/UserLogin.vue')
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/admin/manage',
        name: "Manage",
        // component: () => (),
        meta: {
          // token验证
          ifAPass: true
        }
      },
      {
        path: '/admin/login',
        name: 'AdminLogin',
        component: () => import('../components/AdminLogin.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(function (to, from, next) {
  if (to.meta.ifPass) {
    //页面是否用户登录
    if (localStorage.getItem("token")) {
      // 已登录, 继续跳转
      next();
    } else {
      // 未登录, 跳转至用户登录页面
      next({ name: "UserLogin" });
    }
  } else if (to.meta.ifAPass) {
    //页面是否管理员登录
    if (localStorage.getItem("token")) {
      // 已登录, 继续跳转
      next();
    } else {
      // 未登录, 跳转至管理员登录页面
      next({ name: "AdminLogin" });
    }
  } else {
    //表示不需要登录
    next(); //继续往后走
  }
});

export default router
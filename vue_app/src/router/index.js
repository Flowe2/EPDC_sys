import { createRouter, createWebHistory } from 'vue-router'

import User from '@/views/User.vue';
import Admin from '@/views/Admin.vue';

import UserLogin from '@/components/UserLogin.vue';
import AdminLogin from '@/components/AdminLogin.vue';

import QuBank from '@/components/QuBank.vue';

import Manage from '@/components/Manage.vue';
import UserMaintain from '@/components/manage_subcomp/UserMaintain.vue';
import SignupCheck from '@/components/manage_subcomp/SignupCheck.vue';
import SystemLog from '@/components/manage_subcomp/SystemLog.vue';
import AdminSetting from '@/components/manage_subcomp/AdminSetting.vue';

import About from '@/views/About.vue';
import NotFound from '@/views/NotFound.vue';

const routes = [
  {
    path: '/user',
    name: 'User',
    component: User,
    meta: {
      // token验证
      ifPass: true
    },
    children: [
      {
        path: '/',
        redirect: '/user'
      },
      {
        path: 'qubank',
        name: 'QuBank',
        component: QuBank,
        // meta: {
        //   // token验证
        //   ifPass: true
        // }
      },
      {
        path: 'login',
        component: UserLogin
      }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      // token验证, 也会自动拦截子路由
      ifAPass: true
    },
    children: [
      {
        path: 'manage',
        component: Manage,
        children: [
          {
            path: 'usermaintain',
            component: UserMaintain,
          },
          {
            path: 'signupcheck',
            component: SignupCheck,
          },
          {
            path: 'systemlog',
            component: SystemLog,
          },
          {
            path: 'adminsetting',
            component: AdminSetting,
          },
        ]
      },
      {
        path: 'login',
        component: AdminLogin,
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 404 match
router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href // '/not/found'

export default router
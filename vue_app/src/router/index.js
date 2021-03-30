import { createRouter, createWebHistory } from 'vue-router'

import User from '@/views/User.vue';
import Admin from '@/views/Admin.vue';

import UserLogin from '@/components/UserLogin.vue';
import AdminLogin from '@/components/AdminLogin.vue';

import QuBank from '@/components/QuBank.vue';
import Manage from '@/components/Manage.vue';

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
        path: 'qubank',
        name: 'QuBank',
        component: QuBank,
        meta: {
          // token验证
          ifPass: true
        }
      },
      {
        path: '/',
        redirect: '/user'
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
      // token验证
      ifAPass: true
    },
    children: [
      {
        path: 'manage',
        component: Manage,
        meta: {
          // token验证
          ifAPass: true
        }
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
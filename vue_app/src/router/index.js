import { createRouter, createWebHashHistory } from 'vue-router'

import User from '@/views/User.vue';
import Admin from '@/views/Admin.vue';

import UserLogin from '@/components/UserLogin.vue';
import AdminLogin from '@/components/AdminLogin.vue';

import QuBank from '@/components/QuBank.vue';
import QuestionDisplay from '@/components/qubank_subcomp/QuestionDisplay.vue';// 题目展示(所有题型)
import ComposeHistory from '@/components/qubank_subcomp/ComposeHistory.vue';    // 组卷功能

import Manage from '@/components/Manage.vue';
import UserMaintain from '@/components/manage_subcomp/UserMaintain.vue';      // 账号维护
import SignupCheck from '@/components/manage_subcomp/SignupCheck.vue';        // 注册管理
import SystemLog from '@/components/manage_subcomp/SystemLog.vue';            // 系统日志
import QuestionStatistics from '@/components/manage_subcomp/QuestionStatistics.vue';// 题库统计展示
import AdminSetting from '@/components/manage_subcomp/AdminSetting.vue';      // 系统设置

import About from '@/views/About.vue';                                        // About
import NotFound from '@/views/NotFound.vue';                                  // 404

const routes = [
  {
    path: '/',
    redirect: '/user',
  },
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
        path: '',
        redirect: { name: "RelaySingleChoice" },
      },
      {
        path: 'qubank',
        name: 'QuBank',
        component: QuBank,
        children: [
          {
            path: '',
            name: "RelaySingleChoice",
            redirect: { path: '/user/qubank/questiondisplay/sc' }
          },
          {
            // 动态匹配路由似乎只能使用绝对路径
            path: '/user/qubank/questiondisplay/:type',
            name: 'QuestionDisplay',
            component: QuestionDisplay,
          },
        ]
      },
      {
        path: 'composehistory',
        name: 'ComposeHistory',
        component: ComposeHistory,
      },
      {
        path: 'login',
        name: 'UserLogin',
        component: UserLogin,
        meta: {
          // 去除验证
          ifPass: false,
          login: true
        },
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
        path: '',
        redirect: { name: 'RelayUserMaintain' },
      },
      {
        path: 'manage',
        name: 'Manage',
        component: Manage,
        children: [
          {
            path: '',
            name: 'RelayUserMaintain',
            redirect: { name: 'UserMaintain' },
          },
          {
            path: 'usermaintain',
            name: 'UserMaintain',
            component: UserMaintain,
          },
          {
            path: 'signupcheck',
            name: 'SignupCheck',
            component: SignupCheck,
          },
          {
            path: 'systemlog',
            name: 'SystemLog',
            component: SystemLog,
          },
          {
            path: 'questionstatistics',
            name: 'QuestionStatistics',
            component: QuestionStatistics,
          },
          {
            path: 'adminsetting',
            name: 'AdminSetting',
            component: AdminSetting,
          },
        ]
      },
      {
        path: 'login',
        name: 'AdminLogin',
        component: AdminLogin,
        meta: {
          // 去除验证
          ifAPass: false,
          login: true
        },
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
  history: createWebHashHistory(),
  routes
})

// 404 match
router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href // '/not/found'

export default router
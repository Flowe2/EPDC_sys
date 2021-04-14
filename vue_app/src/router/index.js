import { createRouter, createWebHistory } from 'vue-router'

import User from '@/views/User.vue';
import Admin from '@/views/Admin.vue';

import UserLogin from '@/components/UserLogin.vue';
import AdminLogin from '@/components/AdminLogin.vue';

import QuBank from '@/components/QuBank.vue';
import SingleChoice from '@/components/qubank_subcomp/SingleChoice.vue';      // 单选
import MultipleChoice from '@/components/qubank_subcomp/MultipleChoice.vue';  // 多选
import TrueFalse from '@/components/qubank_subcomp/TrueFalse.vue';            // 判断
import GapFilling from '@/components/qubank_subcomp/GapFilling.vue';          // 填空
import Subjective from '@/components/qubank_subcomp/Subjective.vue';          // 主观
import ComposedPaper from '@/components/qubank_subcomp/ComposedPaper.vue';    // 组卷功能

import Manage from '@/components/Manage.vue';
import UserMaintain from '@/components/manage_subcomp/UserMaintain.vue';      // 账号维护
import SignupCheck from '@/components/manage_subcomp/SignupCheck.vue';        // 注册管理
import SystemLog from '@/components/manage_subcomp/SystemLog.vue';            // 系统日志
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
        redirect: '/user/qubank',
      },
      {
        path: 'qubank',
        name: 'QuBank',
        component: QuBank,
        children: [
          {
            path: 'singlechoice',
            name: 'SingleChoice',
            component: SingleChoice,
          },
          {
            path: 'multiplechoice',
            name: 'MultipleChoice',
            component: MultipleChoice,
          },
          {
            path: 'truefalse',
            name: 'TrueFalse',
            component: TrueFalse,
          },
          {
            path: 'gapfilling',
            name: 'GapFilling',
            component: GapFilling,
          },
          {
            path: 'subjective',
            name: 'Subjective',
            component: Subjective,
          },
          {
            path: 'composedpaper',
            name: 'ComposedPaper',
            component: ComposedPaper,
          },
        ]
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
        redirect: { name: 'Manage_UserMaintain' },
      },
      {
        path: 'manage',
        name: 'Manage',
        component: Manage,
        children: [
          {
            path: '',
            name: 'Manage_UserMaintain',
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
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 404 match
router.resolve({
  name: 'not-found',
  params: { pathMatch: ['not', 'found'] },
}).href // '/not/found'

export default router
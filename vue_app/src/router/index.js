import { createRouter, createWebHistory } from 'vue-router'


import User from '../views/User.vue';
import Admin from '../views/Admin.vue';

const routes = [
  {
    path: '/',
    name: 'User',
    component: User
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children: [
      {
        path: '/admin',
        name: 'Admin',
        component: ()=>('../'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

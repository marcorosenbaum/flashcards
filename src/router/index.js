import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },

    {
      path: '/cardview/:id',
      name: 'cardview',
      component: () => import('../views/CardView.vue')
    },
    {
      path: '/learn',
      name: 'learn',
      component: () => import('../views/LearnView.vue')
    }
  ],
  base: '/'
})

export default router

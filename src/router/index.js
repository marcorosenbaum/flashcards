import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cardview/:id',
      name: 'cardview',
      component: () => import('../views/CardView.vue')
    },
    {
      path: '/user-overview',
      name: 'user-overview',
      component: () => import('../views/UserOverview.vue')
    }
  ]
})

export default router

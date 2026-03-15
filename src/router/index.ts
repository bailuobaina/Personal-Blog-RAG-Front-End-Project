import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/Projects/ProjectsView.vue'),
      meta: { title: '项目' }
    },
    {
      path: '/timeline',
      name: 'timeline',
      component: () => import('@/views/Timeline/TimelineView.vue'),
      meta: { title: '经历' }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/Contact/ContactView.vue'),
      meta: { title: '联系' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title as string) || '个人主页'
  next()
})

export default router

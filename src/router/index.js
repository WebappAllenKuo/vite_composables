import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    redirect: 'composables',
    children: [
      {
        path: 'composables',
        name: 'Composables',
        component: () => import('../components/composables.vue'),
      },
      {
        path: 'directive',
        name: 'Directive',
        component: () => import('../components/directive.vue'),
      },
      {
        path: 'final',
        name: 'Final',
        component: () => import('../components/final.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

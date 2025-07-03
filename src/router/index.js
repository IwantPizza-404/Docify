import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import('../views/EmployeesView.vue'),
    },
    {
      path: '/employees/:id',
      name: 'employee',
      component: () => import('../views/EmployeeView.vue'),
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('../views/DocumentsView.vue'),
    },
    {
      path: '/documents/:id',
      name: 'document',
      component: () => import('../views/DocumentView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      component: () => import('../views/NotFound.vue'),
    },
  ],
})

export default router

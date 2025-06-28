import { createRouter as createVueRouter, type Router, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import dashboardRoutes from './dashboardRoutes'
import { createAuthGuard } from '@auth0/auth0-vue'
import { type App } from 'vue'

export function createRouter(app: App): Router {
  return createVueRouter({
    routes: [
      {
        path: '/',
        name: 'login',
        component: LoginView,
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        children: dashboardRoutes,
        beforeEnter: createAuthGuard(app),
      },
    ],
    history: createWebHistory(),
  })
}

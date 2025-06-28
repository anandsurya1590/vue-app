const dashboardRoutes = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/dashboard/HomeView.vue'),
  },
  {
    path: 'about',
    name: 'about',
    component: () => import('../views/dashboard/AboutView.vue'),
  },
  {
    path: 'users',
    name: 'users',
    component: () => import('../views/dashboard/UsersView.vue'),
  },
  {
    path: 'tanstackusers',
    name: 'tanstackusers',
    component: () => import('../views/dashboard/UsersTanstackView.vue'),
  },
]

export default dashboardRoutes

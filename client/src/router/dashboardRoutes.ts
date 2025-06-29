const dashboardRoutes = [
  {
    path: '',
    name: 'home',
    component: () => import('../views/dashboard/HomeView.vue'),
  },
  {
    path: 'users',
    name: 'Users',
    component: () => import('../views/dashboard/Users.vue'),
  },
]

export default dashboardRoutes

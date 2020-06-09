export default [
  {
    path: '/health',
    name: 'health',
    component: () =>
      import(/* webpackChunkName: "health" */ '@/components/Health.vue')
  }
]

export default [
  {
    path: '/',
    name: 'health',
    component: () =>
      import(/* webpackChunkName: "health" */ '@/components/Health.vue')
  }
]

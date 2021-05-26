export default [
  {
    path: '/flat',
    name: 'flat',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "manage" */ '@/components/ManageFlat.vue')
  }
]

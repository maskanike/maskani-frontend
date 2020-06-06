export default [
  {
    path: '/manage',
    name: 'manage',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "manage" */ '@/components/ManageFlat.vue')
  }
]

export default [
  {
    path: '/tenants',
    name: 'tenants',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "tenants" */ '@/components/Tenants.vue')
  }
]

export default [
  {
    path: '/admin/flats',
    name: 'admin-flats',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-flats" */ '@/components/AdminFlats.vue'
      )
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "admin-users" */ '@/components/AdminUsers.vue'
      )
  }
]

export default [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/components/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () =>
      import(/* webpackChunkName: "register" */ '@/components/Register.vue')
  },
  {
    path: '/verify/:id',
    name: 'verify',
    component: () =>
      import(/* webpackChunkName: "verify" */ '@/components/Verify.vue')
  },
  {
    path: '/forgot',
    name: 'forgotPassword',
    component: () =>
      import(
        /* webpackChunkName: "forgotPassword" */ '@/components/ForgotPassword.vue'
      )
  },
  {
    path: '/reset/:id',
    name: 'resetPassword',
    component: () =>
      import(
        /* webpackChunkName: "resetPassword" */ '@/components/ResetPassword.vue'
      )
  }
]

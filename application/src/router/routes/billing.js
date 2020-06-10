export default [
  {
    path: '/billing',
    name: 'billing',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "billing" */ '@/components/billing/BillingInvoices.vue'
      )
  },
]

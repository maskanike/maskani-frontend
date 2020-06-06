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
  {
    path: '/billing/receipts',
    name: 'billing-receipts',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "billing-receipts" */ '@/components/billing/BillingReceipts.vue'
      )
  }
]

export default [
  {
    path: '/billing/invoices',
    name: 'billing-invoices',
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "billing-invoices" */ '@/components/BillingInvoices.vue'
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
        /* webpackChunkName: "billing-receipts" */ '@/components/BillingReceipts.vue'
      )
  }
]

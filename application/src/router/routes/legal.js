export default [
  {
    path: '/toc',
    name: 'toc',
    component: () =>
      import(
        /* webpackChunkName: "terms-of-service" */ '@/components/legal/TermsOfService.vue'
      )
  },
  {
    path: '/pp',
    name: 'pp',
    component: () =>
      import(
        /* webpackChunkName: "privacy-policy" */ '@/components/legal/PrivacyPolicy.vue'
      )
  }
]

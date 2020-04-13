import Vue from 'vue'
import router from '@/router'
import VueAnalytics from 'vue-analytics'

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueAnalytics, {
    id: '', //  TODO add google anaylics key
    router
  })
}

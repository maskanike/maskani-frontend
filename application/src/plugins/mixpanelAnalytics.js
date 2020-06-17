import Vue from 'vue'
import router from '@/router'
import VueMixpanel from 'vue-mixpanel'

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueMixpanel, {
    token: process.env.MIXPANEL_TOKEN,
    router
  })
}

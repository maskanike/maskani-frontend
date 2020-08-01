import Vue from 'vue'
import VueMixpanel from 'vue-mixpanel'

if (process.env.NODE_ENV === 'production') {
  Vue.use(VueMixpanel, {
    token: process.env.VUE_APP_MIXPANEL_TOKEN,
    config: {
      debug: false
    }
  })
}

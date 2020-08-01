import Vue from 'vue'
import VueDrift from 'vue-drift'

Vue.use(VueDrift, {
  appId: process.env.VUE_APP_DRIFT_TOKEN
})

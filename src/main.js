import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import router from './router'
import axios from 'axios'
import storage from './storage'

Vue.config.productionTip = false

Vue.use(VueMaterial)

new Vue({
  router,
  axios,
  store:storage,
  render: h => h(App)
}).$mount('#app')

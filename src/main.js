import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/Formulate.css'
import VueFormulate from '@braid/vue-formulate'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(VueFormulate, {
  uploader: async function (file, progress, error) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const result = await fetch('http://localhost:8080/import', {
        method: 'POST',
        body: formData
      })
      progress(100) // (native fetch doesn’t support progress updates)
      return await result.json()
    } catch (err) {
      error('Unable to upload file')
    }
  }
})

Vue.use(BootstrapVue)
Vue.use(VueFormulate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

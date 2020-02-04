import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import router from './routes/vue-router'
import axios from 'axios'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8070';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http=axios

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')

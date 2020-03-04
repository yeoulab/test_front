import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

import router from './routes/vue-router'
import axios from 'axios'
import { store } from './store/vuex'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://127.0.0.1:8070';
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true;

/* vuex 설치 */
/* vue-the-mask 설치 */

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')


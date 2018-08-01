import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'typeface-roboto'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(MuseUI);
Vue.use(VueAxios, axios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
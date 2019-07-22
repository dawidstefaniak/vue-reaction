import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import moment from 'moment';
import Stopwatch from "statman-stopwatch";
import Decimal from "decimal.js";
import random from "math-random";

//Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Object.defineProperty(Vue.prototype, '$random', { value: random});
Object.defineProperty(Vue.prototype, '$decimal', { value: Decimal});
Object.defineProperty(Vue.prototype, '$Stopwatch', {value: Stopwatch, writable: true});
Object.defineProperty(Vue.prototype, '$moment', { value: moment});

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


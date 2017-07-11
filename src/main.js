import Vue from 'vue'
import App from './App.vue'
import Ticker from './Ticker.vue'

Vue.component('ticker', Ticker);

new Vue({
  el: '#app',
  render: h => h(App)
})

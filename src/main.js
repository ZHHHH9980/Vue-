import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
// import fastclick from 'fastclick';
import Vuelazyload from 'vue-lazyload';

import 'swiper/dist/css/swiper.css';
import './assets/scss/index.scss';
import './config/rem';

Vue.config.productionTip = false;

// fastclick.attach(document.body);

Vue.use(Vuelazyload, {
  preload: 1,
  error: require('assets/img/error.png'),
  loading: require('assets/img/loading.gif'),
  attempt: 1
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

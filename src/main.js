// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './i18n';

Vue.use(Vuex);
Vue.use(VueResource);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  router,
  store: new Vuex.Store(store),
  i18n,
  render: h => h(App),
}).$mount('#app');

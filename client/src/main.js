import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { http } from './services';
import './registerServiceWorker';

Vue.config.productionTip = false;

http.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 401) {
      store.dispatch('auth/clearAuthToken');
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

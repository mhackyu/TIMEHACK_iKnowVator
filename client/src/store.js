import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authToken: localStorage.getItem('token') || null,
  },
  mutations: {
    SET_AUTH_TOKEN(state, token) {
      localStorage.setItem('token', token);
      state.authToken = token;
    },
    CLEAR_AUTH_TOKEN(state) {
      localStorage.removeItem('token');
      state.authToken = null;
    },
  },
  actions: {
    setAuthToken({ commit }, token) {
      commit('SET_AUTH_TOKEN', token);
    },
    clearAuthToken({ commit }) {
      commit('CLEAR_AUTH_TOKEN');
    }
  }
})

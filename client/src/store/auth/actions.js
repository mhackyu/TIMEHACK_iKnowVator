export default {
  setAuthToken({ commit }, token) {
    commit('SET_AUTH_TOKEN', token);
  },
  clearAuthToken({ commit }) {
    commit('CLEAR_AUTH_TOKEN');
  }
};

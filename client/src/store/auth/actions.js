import { UserService } from '../../services';

export default {
  async logout({ commit, dispatch }) {
    commit('TOGGLE_LOGGING_OUT', true);
    const result = await UserService.logout();
    if (result.status === 200) {
      dispatch('clearAuthToken');
      dispatch('user/clearInfo', null, { root: true });
    }
    commit('TOGGLE_LOGGING_OUT', false);
  },
  setAuthToken({ commit }, token) {
    commit('SET_AUTH_TOKEN', token);
  },
  clearAuthToken({ commit }) {
    commit('CLEAR_AUTH_TOKEN');
  }
};

import { UserService } from '../../services';

export default {
  async getUserInfo({ commit }) {
    commit('TOGGLE_LOADING', true);
    const user = await UserService.getUserInfo();
    commit('TOGGLE_LOADING', false);
    commit('SET_INFO', user);
  },
  clearInfo({ commit }) {
    commit('CLEAR_INFO');
  }
};
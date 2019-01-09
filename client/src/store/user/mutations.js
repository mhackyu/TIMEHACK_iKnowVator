export default {
  SET_INFO(state, payload) {
    state.info = payload;
  },
  TOGGLE_LOADING(state, isLoading) {
    state.isLoading = isLoading;
  },
  TOGGLE_ERROR(state, isError) {
    state.isLoading = isError;
  },
  CLEAR_INFO(state) {
    state.info = {};
  },
};
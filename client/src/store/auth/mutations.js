export default {
  SET_AUTH_TOKEN(state, token) {
    localStorage.setItem('token', token);
    state.authToken = token;
  },
  CLEAR_AUTH_TOKEN(state) {
    localStorage.removeItem('token');
    state.authToken = null;
  }
};
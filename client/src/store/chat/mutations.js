export default {
  ADD_MESSAGE(state, message) {
    state.messages.push(message);
  },
  CLEAR_MESSAGES(state) {
    state.messages = [];
  },
  TOGGLE_SENDING(state, isSending) {
    state.isSending = isSending;
  },
}
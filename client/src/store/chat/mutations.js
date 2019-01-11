export default {
  ADD_MESSAGE(state, message) {
    state.messages.push(message);
  },
  CLEAR_MESSAGES(state) {
    state.messages = [];
  },
  SET_CONTEXT(state, context) {
    state.context = context;
  },
  CLEAR_CONTEXT(state) {
    state.context = {};
  },
  TOGGLE_SENDING(state, isSending) {
    state.isSending = isSending;
  },
  SET_GENERIC(state, generic) {
    state.generic = generic;
  },
  CLEAR_GENERIC(state) {
    state.generic = [];
  },
  TOGGLE_ERROR(state, isError) {
    state.isError = isError;
  }
}
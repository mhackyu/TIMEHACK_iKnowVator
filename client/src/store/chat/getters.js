export default {
  getOptions: state => {
    return state.generic.filter(el => el.options);
  },
  getList: state => {
    if (Array.isArray(state.context.actionResult)) {
      return state.context.actionResult;
    } else {
      return [];
    }
  },
  getAction: state => {
    return state.context.action;
  }
};
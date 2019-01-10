export default {
  getOptions: state => {
    return state.generic.filter(el => el.options);
  }
};

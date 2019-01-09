import { ChatService } from '../../services';

export default {
  async sendMessage({ commit }, data) {
    commit('TOGGLE_SENDING', true);
    // push user message
    if (data.msg != '') commit('ADD_MESSAGE', data.msg);
    const text = data.msg.message;
    const context = data.context;
    const chat = await ChatService.send({
      text,
      context, 
    });
    commit('SET_CONTEXT', chat.context);
    chat.output.text.map(text => {
      const msg = {
        isOwner: false,
        author: 'Sabby',
        message: text,
      };
      commit('ADD_MESSAGE', msg);
    });
    commit('TOGGLE_SENDING', false);
  }
}
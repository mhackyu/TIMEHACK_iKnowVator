import { ChatService } from '../../services';

export default {
  async sendMessage({ commit }, data) {
    try {
      commit('TOGGLE_ERROR', false);
      commit('TOGGLE_SENDING', true);
      commit('CLEAR_LIST');

      // add user message
      if (data.msg != '') commit('ADD_MESSAGE', data.msg);

      const text = data.msg.message;
      const context = data.context;
      const chat = await ChatService.send({
        text,
        context
      });
      chat.output.text.map((text, index) => {
        const msg = {
          isOwner: false,
          author: 'Sabby',
          message: text,
          list: [],
        };
        if (index == (chat.output.text.length - 1) && Array.isArray(chat.context.actionResult)) {
          msg.list = chat.context.actionResult;
          msg.action = chat.context.action;
        }
        commit('ADD_MESSAGE', msg);
      });
      commit('SET_CONTEXT', chat.context);
      commit('SET_GENERIC', chat.output.generic);
    } catch (error) {
      commit('TOGGLE_ERROR', true);
    }
    commit('TOGGLE_SENDING', false);
  }
};

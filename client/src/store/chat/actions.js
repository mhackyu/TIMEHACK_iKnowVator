import { ChatService } from '../../services';
import actionsUtil from '../../utils/actions';

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
        let msg = {};
        msg.isOwner = false;
        msg.author = 'Sabby';
        msg.message = text;
        msg.list = [];
        msg.action = null;

        // Trigger an action for msg data manipulation
        if (index == (chat.output.text.length - 1) && chat.context.action) {
          if (typeof actionsUtil[chat.context.action] === 'function') {
            // if (chat.context.action.includes('VIEW')) commit('REMOVE_LAST_MESSAGE');
            msg = actionsUtil[chat.context.action](msg, chat.context);
          }
        }
        commit('ADD_MESSAGE', msg);
      });
      commit('SET_CONTEXT', chat.context);
      commit('SET_GENERIC', chat.output.generic);
    } catch (error) {
      console.log('ERROR', error);
      commit('TOGGLE_ERROR', true);
    }
    commit('TOGGLE_SENDING', false);
  }
};

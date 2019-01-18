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

      chat.output.generic.map(response => {
        let msg = {};
        msg.isOwner = false;
        msg.author = 'Sabby';
        msg.message = '';
        msg.list = [];
        msg.options = [];
        msg.action = null;

        switch (response.response_type) {
          case 'text':
            msg.message = response.text;
            break;
          case 'option':
            msg.message = response.title;
            msg.options = response.options;
            break;
          case 'list':
            msg.action = response.action;
            msg.message = response.text;
            msg.list = response.list;
            break;
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

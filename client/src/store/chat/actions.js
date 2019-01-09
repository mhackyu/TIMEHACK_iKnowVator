import { ChatService } from '../../services';

export default {
  async sendMessage({ commit }, message) {
    commit('TOGGLE_SENDING', true);
    if (message != '') commit('ADD_MESSAGE', message);
    const chat = await ChatService.send({
      text: message.message,
    });
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
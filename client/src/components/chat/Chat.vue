<template>
  <div class="container-fluid">
    <div class="mesgs">
      <h3 class="text-center bot-heading">Sabrina</h3>
      <div ref="msgHistory" class="msg_history">
        <div v-for="(msg, index) in messages" :key="index">
          <chat-incoming v-if="!msg.isOwner" :msg="msg" />
          <chat-outgoing v-else :msg="msg"/>
        </div>
        <div class="incoming_msg" v-show="isSending">
          <div class="incoming_msg_img">
            <img class="avatar" src="../img/avatar.png" style="height: 32px; width: 32px;">
            <div class="received_msg">
              <img class="typing" src="https://media.giphy.com/media/dYsB5F09z0fYvQLm9K/giphy.gif" />
              <p class="loading">Sab is typing...</p>
            </div>
          </div>
        </div>
      </div>
      <div class="type_msg">
        <form class="input_msg_write" @submit.prevent="send">
          <input
            type="text"
            class="write_msg"
            autofocus
            placeholder="Type your message..."
            v-model="message"
          >
          <button class="material-icons" type="submit">send</button>
        </form>
        <p v-show="isError">Something went wrong. Please try again.</p>
        <chat-option-list v-if="!isSending" :options="options"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import ChatIncoming from './ChatIncoming.vue';
import ChatOutgoing from './ChatOutgoing.vue';
import ChatOptionList from './ChatOptionList.vue';

export default {
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...mapState('user', { user: 'info' }),
    ...mapState('chat', ['messages', 'isSending', 'context', 'isError']),
    ...mapGetters({
      options: 'chat/getOptions'
    }),
    canSend() {
      return this.message != '' ? true : false;
    }
  },
  components: {
    ChatIncoming,
    ChatOutgoing,
    ChatOptionList
  },
  methods: {
    send() {
      if (!this.canSend) return;
      const msg = {
        isOwner: true,
        author: this.user.display_name,
        message: this.message
      };
      this.$store.dispatch('chat/sendMessage', { msg, context: this.context });
      this.message = '';
    }
  },
  watch: {
    messages() {
      const h = this.$refs.msgHistory;
      h.scrollTop = h.scrollHeight;
    },
    user(data) {
      if (data !== null && this.messages.length === 0) {
        this.$store.dispatch('chat/sendMessage', { msg: '', context: { user: this.user.display_name } });
      }
    }
  },
}
</script>

<style scoped>
@import "./chat.css";
</style>

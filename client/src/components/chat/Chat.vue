<template>
  <div class="container">
    <div class="messaging">
      <div class="inbox_msg">
        <div class="mesgs">
          <h3 class="text-center">Sabby</h3>
          <div ref="msgHistory" class="msg_history">
            <div v-for="(msg, index) in messages" :key="index">
              <chat-incoming v-if="!msg.isOwner" :author="msg.author" :msg="msg.message" />
              <chat-outgoing v-else :author="msg.author" :msg="msg.message" />
            </div>
            <p class="loading" v-show="isSending">Sab is typing...</p>
          </div>
          <div class="type_msg">
            <form class="input_msg_write" @submit.prevent="send">
              <input type="text" class="write_msg" placeholder="Type your message..." v-model="message">
              <button class="msg_send_btn" type="submit">
                Send
              </button>
            </form>
            <p v-show="isError">Something went wrong. Please try again.</p>
            <chat-option-list v-if="!isSending" :options="options" />
          </div>
        </div>
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
  mounted() {
    if (this.messages.length === 0) this.$store.dispatch('chat/sendMessage', { msg: '' });
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
    }
  },
}
</script>

<style scoped>
@import "./chat.css";
</style>

<template>
  <div class="container">
    <h3 class="text-center">Sabby</h3>
    <div class="messaging">
      <div class="inbox_msg">
        <div class="mesgs">
          <div class="msg_history">
            <div v-for="(msg, index) in messages" :key="index">
              <chat-incoming 
                v-if="!msg.isOwner"
                :author="msg.author" 
                :msg="msg.message"
              />
              <chat-outgoing 
                v-else
                :author="msg.author" 
                :msg="msg.message"
              />
            </div>
            <p v-show="isSending">Sab is typing...</p>
          </div>
          <div class="type_msg">
            <form class="input_msg_write" @submit.prevent="send">
              <input type="text" class="write_msg" placeholder="Your message" v-model="message"> 
              <button class="msg_send_btn" type="button"> 
                <i class="small material-icons">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ChatIncoming from './ChatIncoming.vue';
import ChatOutgoing from './ChatOutgoing.vue';

export default {
  data() {
    return {
      message: '',
    };
  },
  computed: {
    ...mapState('user', { user: 'info' }),
    ...mapState('chat', ['messages', 'isSending']),
  },
  components: {
    ChatIncoming,
    ChatOutgoing
  },
  mounted() {
    this.$store.dispatch('chat/sendMessage', '');
  },
  methods: {
    send() {
      const msg = {
        isOwner: true,
        author: this.user.display_name,
        message: this.message
      };
      this.$store.dispatch('chat/sendMessage', msg);
      this.message = '';
    }
  }
}
</script>

<style scoped>
@import "./chat.css";
</style>

<template>
  <div class="incoming_msg">
    <div class="incoming_msg_img">
      <img src="https://emoji.slack-edge.com/T91BPUL04/jodie_smiley_max/6f1c71bdf2523319.jpg" width="28" height="28">
    </div>
    <div class="received_msg">
      <div class="received_withd_msg">
        <p>{{ msg.message }}</p>
        <div v-if="msg.list.length > 0">
          <chat-list :msg="msg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatList from './ChatList.vue';

export default {
  props: {
    msg: Object,
  },
  components: {
    ChatList,
  }
}
</script>

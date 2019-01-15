<template>
  <div class="incoming_msg">
    <div class="incoming_msg_img">
      <img class="avatar" src="../img/avatar.png" style="height: 32px; width: 32px;">
      <div class="received_msg">
      <div class="received_withd_msg">
        <p>{{ msg.message }}</p>
        <div v-if="msg.list.length > 0">
          <chat-list :msg="msg" />
        </div>
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

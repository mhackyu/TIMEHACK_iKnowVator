<template>
  <li class="item" @click="send(option)">{{ option.label }}</li>
</template>

<script>
import { mapState } from 'vuex';

export default {
  props: {
    option: Object
  },
  computed: {
    ...mapState('user', { user: 'info' }),
    ...mapState('chat', ['context']),
  },
  methods: {
    send(option) {
      const msg = {
        isOwner: true,
        author: this.user.display_name,
        message: option.label
      };
      this.$store.dispatch('chat/sendMessage', { msg, context: this.context });
    }
  },
}
</script>

<style scoped>
.item {
  border: 1px solid black;
  margin: 6px;
  padding: 6px;
}
</style>

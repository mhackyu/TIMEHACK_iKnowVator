<template>
  <button class="btn btn-default btn-block" role="presentation" @click="send(option)">{{ option.label }}</button>
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
.btn-default {
  margin: 2px;
  border-radius: 30px;
  background: #0084ff;
  color: #fff;
}
.btn-default:hover{
  background-color: white;
  color: #008CBA 
}

</style>

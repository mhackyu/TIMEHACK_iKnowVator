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
  /* margin: 2px;
  margin-bottom: 8px; */
  margin: 6px 2px;
  border-radius: 30px;
  /* background: #0084ff; */
  /* background-color: #38444d; */
  /* background-color: rgb(28, 41, 56); */
  /* background-color: #ff00b1; */
  background-color: #465663;
  color: #fff;
  /* border: 1px solid #44e8d3; */
}
.btn-default:hover{
  background-color: white;
  color: #008CBA 
}

</style>

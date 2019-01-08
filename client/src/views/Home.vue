<template>
  <div>
    <Chat v-if="authToken" />
    <Login v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chat from '../components/chat/Chat.vue';
import Login from '../components/login/Login.vue';

export default {
  computed: {
    ...mapState('auth', ['authToken'])
  },
  components: {
    Chat,
    Login
  }
}
</script>

<style scoped>

</style>

<template>
  <div :class="hasPanda">
    <Chat v-if="authToken" id="chat-page"/>
    <About v-else id="about-page" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chat from '../components/chat/Chat.vue';
import About from './About.vue'

export default {
  computed: {
    ...mapState('auth', ['authToken']),
    hasPanda() {
      return this.authToken ? 'panda' : 'no-panda';
    }
  },
  components: {
    Chat,
    About,
  }
}
</script>

<style scoped>

</style>

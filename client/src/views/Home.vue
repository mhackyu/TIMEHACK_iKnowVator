<template>
  <div>
    <Chat v-if="authToken" />
    <About v-else />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chat from '../components/chat/Chat.vue';
import About from './About.vue'

export default {
  computed: {
    ...mapState('auth', ['authToken'])
  },
  components: {
    Chat,
    About
  }
}
</script>

<style scoped>

</style>

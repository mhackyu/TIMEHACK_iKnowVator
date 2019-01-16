<template>
  <div v-if="authToken" class="panda">
    <Chat v-if="authToken" id="chat-page"/>
    <About v-else id="about-page" />
    <!-- <Footer /> -->
  </div>
  <div v-else class="no-panda">
    <Chat v-if="authToken" id="chat-page"/>
    <About v-else id="about-page" />
    <!-- <Footer /> -->
  </div>
  
</template>

<script>
import { mapState } from 'vuex';
import Chat from '../components/chat/Chat.vue';
import About from './About.vue'
import Footer from '../components/footer/Footer.vue';

export default {
  computed: {
    ...mapState('auth', ['authToken'])
  },
  components: {
    Chat,
    About,
    Footer
  }
}
</script>

<style scoped>

</style>

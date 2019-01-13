<template>
  <div id="app">
    <div id="nav" v-if="$route.name !== 'auth'">
      <NavBar />
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from './components/nav/NavBar.vue';

export default {
  computed: {
    ...mapState('auth', ['authToken']),
  },
  components: {
    NavBar,
  }
}
</script>

<style>
@import './main.css';
</style>

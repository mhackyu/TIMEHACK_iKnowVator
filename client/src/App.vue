<template>
  <div id="app">
    <div id="nav">
      <NavBar v-if="isAuth" />
    </div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavBar from './components/nav/NavBar.vue';

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      isAuth: 'isAuth',
    }),
  },
  components: {
    NavBar,
  }
}
</script>

<style>
@import './main.css';
</style>

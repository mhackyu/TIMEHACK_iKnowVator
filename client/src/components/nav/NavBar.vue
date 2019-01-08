<template>
  <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <router-link class="navbar-brand" to="/">IKNOWVATOR</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item" v-if="authToken">
            <a class="nav-link" @click="logout">Logout</a>
          </li>
        </ul>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState(['authToken'])
  },
  methods: {
    logout() {
      this.$store.dispatch('clearAuthToken');
    }
  },
}
</script>
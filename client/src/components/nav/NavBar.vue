<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: #1c2938;">
    <router-link class="navbar-brand" to="/">IKNOWVATOR</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarCollapse"
      aria-controls="navbarCollapse"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarCollapse">
      <ul class="navbar-nav mr-auto">
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/">Home</router-link>
        </li> -->
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li> -->
      </ul>
    </div>
    <div class="mx-auto order-0">
      <ul class="navbar-nav mr-auto">

        <li class="nav-item" v-if="authToken">
          <div id="customBtn" class="customGPlusSignIn">
            <a @click="logout">
            <span class="icon"></span>
            <span class="buttonText">Sign out</span>
            </a>
          </div>
        </li>

        <li class="nav-item" v-else>
          <div id="customBtn" class="customGPlusSignIn">
            <a href="http://localhost:5000/auth/google">
            <span class="icon"></span>
            <span class="buttonText">Google</span>
            </a>
          </div>
        </li>

      </ul>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('auth', ['authToken']),
    ...mapState('user', { user: 'info'}),
  },
  methods: {
    ...mapActions({
      getUserInfo: 'user/getUserInfo'
    }),
    logout() {
      this.$store.dispatch('auth/clearAuthToken');
      this.$store.dispatch('user/clearInfo');
    },
  },
  mounted() {
    if (this.authToken) {
      this.getUserInfo();
    }
  },
}
</script>

 <style type="text/css">
  @import "./nav.css";
</style>

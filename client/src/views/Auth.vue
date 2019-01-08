<template>
  <p>Please wait..</p>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('auth/setAuthToken', this.$route.params.token);
    window.location.href = '/';
  },
}
</script>
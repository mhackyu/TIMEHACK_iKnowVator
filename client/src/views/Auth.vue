<template>
  <p>Please wait..</p>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('setAuthToken', this.$route.params.token);
    this.$router.push('/');
  },
}
</script>
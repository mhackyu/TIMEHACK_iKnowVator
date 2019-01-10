<template>
  <li class="item">{{ option.label }}</li>
</template>

<script>
export default {
  props: {
    option: Object
  }
}
</script>

<style scoped>
.item {
  border: 1px solid black;
  margin: 6px;
  padding: 6px;
}
</style>

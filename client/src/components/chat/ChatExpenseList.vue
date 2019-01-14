<template>
  <div>
    <ul class="list" v-for="(item, index) in items" :key="index">
      <li class="list-item">{{ index + 1 }}. {{ item.description }} on {{ item.date_created }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
  },
}
</script>

<style scoped>
.list {

}
.list-item {

}
</style>
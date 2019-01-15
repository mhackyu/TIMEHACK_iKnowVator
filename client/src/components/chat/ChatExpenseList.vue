<template>
  <div class="list">
    <ul >
      <li v-for="(item, index) in items" :key="index" class="list-item"> 
        {{ index + 1 }}. {{ item.description }} on {{ formatDate(item.date_created) }}.
      </li>
    </ul>
  </div>
</template>

<script>
import format from '../../utils/formatter';

export default {
  props: {
    items: Array,
  },
  methods: {
    formatDate(data) {
      return format.toDate(data);
    }
  },
}
</script>

<style scoped>
.list {
  margin: 0;
}
.list-item {
  margin: 0;
  padding: 0;
}
</style>
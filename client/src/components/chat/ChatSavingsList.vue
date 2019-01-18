<template>
  <div class="list">
    <ul >
      <li v-for="(item, index) in items" :key="index" class="list-item"> 
        You have saved {{ formatCurrency(item.current_amount) }} / {{ formatCurrency(item.goal_amount) }} from {{ formatDate(item.date_start) }} to {{ formatDate(item.date_end) }}.
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
    },
    formatCurrency(data) {
      return format.toCurreny(data);
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
  margin-right: 12px;
}
</style>
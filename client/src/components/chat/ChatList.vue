<template>
  <div>
    <chat-expense-list :items="msg.list" v-if="msg.action === 'VIEW_EXPENSE'"/>
  </div>
</template>

<script>
import ChatExpenseList from './ChatExpenseList.vue';

export default {
  props: {
    msg: Object,
  },
  components: {
    ChatExpenseList
  }
}
</script>
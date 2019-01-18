<template>
  <div>
    <chat-expense-list :items="msg.list" v-if="msg.action === 'VIEW_EXPENSE'"/>
    <chat-income-list :items="msg.list" v-if="msg.action === 'VIEW_INCOME'"/>
  </div>
</template>

<script>
import ChatExpenseList from './ChatExpenseList.vue';
import ChatIncomeList from './ChatIncomeList.vue';

export default {
  props: {
    msg: Object,
  },
  components: {
    ChatExpenseList,
    ChatIncomeList
  }
}
</script>
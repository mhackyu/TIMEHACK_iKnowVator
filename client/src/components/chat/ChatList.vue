<template>
  <div>
    <chat-expense-list :items="msg.list" v-if="msg.action === 'VIEW_EXPENSE'"/>
    <chat-income-list :items="msg.list" v-if="msg.action === 'VIEW_INCOME'"/>
    <chat-savings-list :items="msg.list" v-if="msg.action === 'VIEW_SAVINGS'"/>
    <chat-budget-list :items="msg.list" v-if="msg.action === 'VIEW_BUDGET'"/>
  </div>
</template>

<script>
import ChatExpenseList from './ChatExpenseList.vue';
import ChatIncomeList from './ChatIncomeList.vue';
import ChatSavingsList from './ChatSavingsList.vue';
import ChatBudgetList from './ChatBudgetList.vue';

export default {
  props: {
    msg: Object,
  },
  components: {
    ChatExpenseList,
    ChatIncomeList,
    ChatSavingsList,
    ChatBudgetList
  }
}
</script>
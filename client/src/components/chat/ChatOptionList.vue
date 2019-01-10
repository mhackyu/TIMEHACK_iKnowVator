<template>
  <div>
    <div class="option" v-for="(item, index) in options" :key="index">
      <ul v-for="(option, index) in item.options" :key="index">
        <chat-option-list-item :option="option" />
      </ul>
    </div>
  </div>
</template>

<script>
import ChatOptionListItem from './ChatOptionListItem.vue';

export default {
  props: {
    options: Array
  },
  components: {
    ChatOptionListItem
  }
}
</script>

<style scoped>
.option {
  border: 1px solid red;
  margin-top: 10px;
}
</style>


<template>
  <div>
    <div class="option" v-for="(item, index) in options" :key="index">
      <div v-for="(option, index) in item.options" :key="index">
        <chat-option-list-item :option="option" />
      </div>
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
  margin-top: 6px;
  /* border: 1px solid #fff; */
  /* background-color: rgb(28, 41, 56); */
}
</style>


<template>
  <div class="outgoing_msg">
    <div class="sent_msg">
      <p>{{ msg }}</p>
      <!-- <span class="time_date">11:01 AM | Today</span> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: String,
    msg: String,
  }
}
</script>
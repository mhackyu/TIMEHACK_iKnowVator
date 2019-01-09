<template>
  <div class="incoming_msg">
    <div class="incoming_msg_img">
      <img src="https://emoji.slack-edge.com/T91BPUL04/jodie_smiley_max/6f1c71bdf2523319.jpg">
    </div>
    <div class="received_msg">
      <div class="received_withd_msg">
        <p>{{ msg }}</p>
        <!-- <span class="time_date">11:01 AM | Yesterday</span> -->
      </div>
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

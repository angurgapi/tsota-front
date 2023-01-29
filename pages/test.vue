<template>
  <div>
    <span>{{ msg }}</span>
    <button @click="log">+</button>
  </div>
</template>

<script lang="ts" setup>
// variable
const msg: string = 'Hello!'

// functions
function log() {
  console.log(msg)
}
</script>

<style lang="scss" scoped>
.dot {
  height: 22px;
  width: 22px;
  background: #000;
}
</style>

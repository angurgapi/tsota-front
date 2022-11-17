<template>
  <div class="polaroid" :style="`width: ${width}px; height: ${height}`">
    <img class="polaroid__img" :src="img" />
    <span class="polaroid__label">{{}}</span>
  </div>
</template>

<script>
export default {
  name: 'Polaroid',
  props: {
    img: {
      type: String,
      required: true
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    width: {
      type: [String, Number],
      default: '300'
    }
  }
}
</script>

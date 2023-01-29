<template>
  <div class="polaroid f-column">
    <img class="polaroid__img" :src="img" />
    <span v-if="royalty" class="polaroid__royalty">©{{ royalty }}</span>
    <span class="polaroid__label" :style="`font-size: ${getFontSize}px;`">{{
      label
    }}</span>
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
    label: {
      type: String,
      default: ''
    },

    royalty: {
      type: String,
      default: ''
    }
  },
  computed: {
    getFontSize() {
      return this.label.length > 7 ? 30 : 40
    }
  }
}
</script>

<style lang="scss" scoped>
.polaroid {
  position: relative;
  padding: 20px 20px 15px;
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 20%);
  cursor: pointer;
  background: #fff;
  max-height: 80vh;
  width: auto;
  aspect-ratio: 3/4;

  &__img {
    object-fit: cover;
    aspect-ratio: 1;
    display: flex;
    max-height: 90%;
  }

  &__label {
    margin-top: 10px;

    // font-size: 40px;
    height: 60px;
    text-align: center;
    opacity: 0.9;
  }

  &__royalty {
    position: absolute;
    right: 20px;
    bottom: 66px;
    font-size: 12px;
    text-transform: uppercase;
    opacity: 0.3;
  }
}
</style>

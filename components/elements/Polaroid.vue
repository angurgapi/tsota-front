<template>
  <div
    class="polaroid__wrapper f-column"
    :style="`width: ${width}px; height: ${height}`"
  >
    <div class="polaroid f-column">
      <img class="polaroid__img" :src="img" />
      <span v-if="royalty" class="polaroid__royalty">©{{ royalty }}</span>
      <span class="polaroid__label" :style="`font-size: ${getFontSize}px;`">{{
        label
      }}</span>
    </div>
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
    height: {
      type: [String, Number],
      default: 'auto'
    },
    width: {
      type: [String, Number],
      default: '300'
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

  // box-shadow: 5px 17px 29px 1px rgba(34, 60, 80, 20%);
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 20%);

  // background: rgba(0, 0, 0, 2%);
  background: #fff;

  &__wrapper {
    padding: 5px 8px 12px;
    background: #fff;
  }

  &__img {
    object-fit: cover;
    aspect-ratio: 1;
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

  @media (max-width: 340px) {
    max-width: 90%;
  }
}
</style>

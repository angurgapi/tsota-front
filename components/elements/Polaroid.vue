<template>
  <div
    class="polaroid f-column"
    :style="`width: ${width}px; height: ${height}`"
  >
    <img class="polaroid__img" :src="img" />
    <span v-if="royalty" class="polaroid__royalty">©{{ royalty }}</span>
    <span class="polaroid__label">{{ label }}</span>
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
  }
}
</script>

<style lang="scss" scoped>
.polaroid {
  position: relative;
  padding: 20px 20px 15px;
  box-shadow: 5px 17px 29px 1px rgba(34, 60, 80, 20%);
  background: rgba(0, 0, 0, 2%);

  &__img {
    object-fit: cover;
    aspect-ratio: 1;
  }

  &__label {
    margin-top: 10px;
    font-size: 40px;
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

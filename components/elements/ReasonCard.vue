<template>
  <div class="card">
    <img class="card__media" :src="card.image" />
    <p class="card__text" v-html="card.text" />
  </div>
</template>

<script>
export default {
  name: 'ReasonCard',
  props: {
    card: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  &__media {
    width: 100%;
    height: auto;
  }
  &__text {
    text-align: justify;
    margin-top: 16px;
  }
}
</style>

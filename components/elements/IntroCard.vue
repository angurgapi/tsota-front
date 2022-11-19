<template>
  <div class="card">
    <div class="card__header f-row">
      <svg-image :name="card.icon" height="24" width="24" /><span
        class="highlighted"
        >{{ card.title }}</span
      >
    </div>
    <template v-if="card.text">
      <p v-html="card.text" />
    </template>
    <template v-else>
      <slot name="content" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'IntroCard',
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
  &__header {
    margin-bottom: 16px;

    img {
      margin-right: 16px;
    }
  }
}
</style>

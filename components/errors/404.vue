<template>
  <div class="error-page f-column">
    <lottie-player
      src="/animations/error-404.json"
      class="error-page__animation"
      loop
      autoPlay
    />
    <span class="error-page__title">Упс! Страница не найдена</span>
    <nuxt-link to="/" class="btn btn--success error-page__btn"
      >На главную</nuxt-link
    >
  </div>
</template>

<script>
export default {
  name: 'error404',

  props: {
    error: {
      type: Object,
      required: false
    }
  },
  head: {
    script: [
      {
        src: 'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
        rel: 'preload'
      }
    ]
  }
}
</script>

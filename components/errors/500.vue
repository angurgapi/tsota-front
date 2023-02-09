<template>
  <div class="error-page f-column">
    <lottie-player
      src="/animations/error-500.json"
      class="error-page__animation"
      loop
      autoPlay
    />
    <span class="error-page__title">Упс! Что-то пошло не так</span>
    <button class="btn btn--success error-page__btn" @click="refresh">
      Перезагрузить
    </button>
  </div>
</template>

<script>
export default {
  name: 'error500',

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
  },
  methods: {
    refresh() {
      window.location.reload()
    }
  }
}
</script>

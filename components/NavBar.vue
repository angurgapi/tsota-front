<template>
  <div class="navbar f-row" :class="{ 'navbar--fixed': isFixed }">
    <nuxt-link class="navbar__link" to="/">
      <svg-image name="home" height="20" width="20" />
    </nuxt-link>
    <div class="navbar__right f-row">
      <nuxt-link class="navbar__link" to="/pets">
        <svg-image height="20" width="20" name="book" />
        {{ $t('Navbar.projects') }}
      </nuxt-link>
      <button
        v-for="locale in availableLocales"
        :key="locale.code"
        class="btn navbar__link"
        @click="changeLocale(locale.code)"
      >
        {{ locale.name }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data: () => ({
    isFixed: false
  }),
  computed: {
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    changeLocale(code) {
      this.$i18n.setLocale(code)
      console.log(this.$i18n.locale)
    },
    onScroll() {
      if (window.pageYOffset > 0) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  }
}
</script>

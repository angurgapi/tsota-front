<template>
  <nav class="navbar f-row" :class="{ 'navbar--fixed': isFixed }">
    <nuxt-link class="navbar__link" to="/">
      <img class="navbar__logo" src="img/logo1.png" />
    </nuxt-link>
    <div class="navbar__right f-row">
      <!-- <nuxt-link class="navbar__link" to="/pets">
        <svg-image height="20" width="20" name="book" />
        Уроки
      </nuxt-link> -->
      <div class="navbar__menu">
        <button class="navbar__btn" @click="isDropdownOpen = !isDropdownOpen">
          <svg-icon height="20" width="20" name="book" />
          Алфавит
        </button>
        <NavDropdown v-if="isDropdownOpen" @close="isDropdownOpen = false" />
      </div>
      <!-- <button
        v-for="locale in availableLocales"
        :key="locale.code"
        class="btn navbar__link"
        @click="changeLocale(locale.code)"
      >
        {{ locale.name }}
      </button> -->
    </div>
  </nav>
</template>

<script>
import NavDropdown from './NavDropdown'

export default {
  name: 'NavBar',
  components: { NavDropdown },
  data: () => ({
    isFixed: false,
    isDropdownOpen: false
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
